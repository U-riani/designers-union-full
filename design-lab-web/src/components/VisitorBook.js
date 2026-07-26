import React, { useState, useEffect } from "react";
import {
  FloatingLabel,
  Form,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  format,
  isSameDay,
  isToday,
  setHours,
  setMinutes,
  addMinutes,
  isAfter,
  isBefore
} from "date-fns";
import {
  useBookVisitMutation,
  useGetBookedTimesQuery,
} from "../data/visitsSlice";

const VisitBookForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [visitDate, setVisitDate] = useState(new Date());
  const [availableTimes, setAvailableTimes] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedTime, setSelectedTime] = useState(0);

  const [bookVisit] = useBookVisitMutation();
  const { data: bookedTimes } = useGetBookedTimesQuery(
    format(visitDate, "yyyy-MM-dd")
  );

  const getAvailableTimes = () => {
    const times = [];
    let start = setHours(setMinutes(new Date(), 0), 11); // 11:00 AM
    const end = setHours(setMinutes(new Date(), 0), 19); // 7:00 PM

    while (start <= end) {
      times.push(format(start, "HH:mm"));
      start = addMinutes(start, 15);
    }

    if (isToday(visitDate)) {
      const now = new Date();
      return times.filter((time) =>
        isAfter(
          setHours(
            setMinutes(new Date(), time.split(":")[1]),
            time.split(":")[0]
          ),
          now
        )
      );
    }

    return times;
  };

  useEffect(() => {
    if (bookedTimes) {
      const bookedForSelectedDate = bookedTimes
        .filter((entry) => isSameDay(new Date(entry.visitDate), visitDate))
        .flatMap((entry) => {
          const times = [];
          const startTime = new Date(entry.visitDate);
          for (let i = 0; i < +entry.selectedTime; i++) {
            const intervalTime = new Date(
              startTime.getTime() + i * 15 * 60 * 1000
            );
            times.push(format(intervalTime, "HH:mm"));
          }
          return times;
        });

      const allAvailableTimes = getAvailableTimes();
      const filteredTimes = allAvailableTimes.filter(
        (time) => !bookedForSelectedDate.includes(time)
      );
      setAvailableTimes(filteredTimes);
    } else {
      setAvailableTimes(getAvailableTimes());
    }
  }, [bookedTimes, visitDate]);

  useEffect(() => {
    if (startTime && endTime) {
      const [startHours, startMinutes] = startTime.split(":").map(Number);
      const [endHours, endMinutes] = endTime.split(":").map(Number);

      const startDateTime = setHours(
        setMinutes(new Date(), startMinutes),
        startHours
      );
      const endDateTime = setHours(setMinutes(new Date(), endMinutes), endHours);

      const differenceInMinutes =
        (endDateTime - startDateTime) / (1000 * 60);
      const intervals = Math.ceil(differenceInMinutes / 15);

      setSelectedTime(intervals > 0 ? intervals : 0);
    }
  }, [startTime, endTime]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const visitDateTime = new Date(visitDate);
      const [hours, minutes] = startTime.split(":").map(Number);
      visitDateTime.setHours(hours, minutes);

      const { data } = await bookVisit({
        name,
        email,
        phone,
        message,
        visitDate: visitDateTime.toISOString(),
        selectedTime,
      });

      if (data && data.message) {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error recording visit:", error);
      alert("Please select time");
    }
  };

  const getEndTimes = () => {
    if (!startTime) return [];
    const filteredEndTimes = availableTimes.filter((time) => {
      return isAfter(
        setHours(setMinutes(new Date(), time.split(":")[1]), time.split(":")[0]),
        setHours(
          setMinutes(new Date(), startTime.split(":")[1]),
          startTime.split(":")[0]
        )
      );
    });

    // Find the first booked time and disable times from there
    const firstBooked = bookedTimes
      ?.flatMap((entry) => entry.visitDate)
      .map((time) => format(new Date(time), "HH:mm"))
      .find((bookedTime) =>
        isAfter(
          setHours(
            setMinutes(new Date(), bookedTime.split(":")[1]),
            bookedTime.split(":")[0]
          ),
          setHours(
            setMinutes(new Date(), startTime.split(":")[1]),
            startTime.split(":")[0]
          )
        )
      );

    if (firstBooked) {
      return filteredEndTimes.filter((time) =>
        isBefore(
          setHours(
            setMinutes(new Date(), time.split(":")[1]),
            time.split(":")[0]
          ),
          setHours(
            setMinutes(new Date(), firstBooked.split(":")[1]),
            firstBooked.split(":")[0]
          )
        )
      );
    }

    return filteredEndTimes;
  };
  

  return (
    <Container className="visitor-book-component py-4 py-lg-5">
      <Row className="d-flex justify-content-center justify-content-lg-start">
        <Col md={6} className="form-info p-3 p-lg-5">
          <Form onSubmit={handleSubmit}>
            <FloatingLabel controlId="formName" label="Name" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </FloatingLabel>

            <FloatingLabel controlId="formEmail" label="Email" className="mb-3">
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="formPhone"
              label="Phone Number"
              className="mb-3"
            >
              <Form.Control
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </FloatingLabel>

            <Row className="mb-3">
              <Col className="visit-date-col">
                <FloatingLabel label="Visit Date" controlId="formDate">
                  <DatePicker
                    selected={visitDate}
                    onChange={(date) => setVisitDate(date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select a date"
                    minDate={new Date()}
                    className="form-control"
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="formTime" label="Start Time">
                  <Form.Select
                    onChange={(e) => setStartTime(e.target.value)}
                    className="form-control"
                    required
                    value={startTime}
                  >
                    <option>-- : --</option>
                    {getAvailableTimes().map((time) => (
                      <option
                        key={time}
                        value={time}
                        disabled={!availableTimes.includes(time)}
                        className={`${availableTimes.includes(time) ? 'disabled-option' : ''}`}
                      >
                        {time}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
                <FloatingLabel controlId="formTime" label="End Time">
                  <Form.Select
                    onChange={(e) => setEndTime(e.target.value)}
                    className="form-control"
                    required
                    value={endTime}
                  >
                    <option>-- : --</option>
                    {getEndTimes().map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>

            <Form.Group controlId="formMessage" className="mb-3">
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Enter a message (optional)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Form.Group>

            <Button
              type="submit"
              className="submit-button rounded-0 bg-black border-0 btn btn-lg"
            >
              Record Visit
            </Button>
          </Form>
          {/* <div className="contact-info-container p-4  mt-lg-0">
            <div className="contact-info-tel mb-3">
              <h5>Tel</h5>
              <p>+995 599 64 06 41</p>
            </div>
            <div className="contact-info-email mb-3">
              <h5>Email</h5>
              <p>info@design-lab-ge</p>
            </div>
            <div className="contact-info-address">
              <h5>address</h5>
              <p className="mb-0">Tbilisi, Georgia</p>
              <p className="mb-0">Ana Politkovskaia St 3/28</p>
            </div>
          </div> */}
        </Col>
      </Row>
    </Container>
  );
};

export default VisitBookForm;
