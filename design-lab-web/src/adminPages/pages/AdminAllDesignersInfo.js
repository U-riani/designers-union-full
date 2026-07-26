import React from "react";
import { useGetAllDesignersInfoQuery } from "../../data/designersSlice2";
import { Col, Container, Row, Table, Spinner } from "react-bootstrap";

const AdminAllDesignersInfo = () => {
  const { data, isLoading, error } = useGetAllDesignersInfoQuery();
  console.log(error);
  if (isLoading) {
    return (
      <Container fluid>
        <Row className="w-full h-full d-flex justify-content-center align-items-center">
          <Spinner animation="grow" />
        </Row>
      </Container>
    );
  }

  if (error) {
    return (
      <Container fluid>
        <Row className="w-full h-full">
          <Col className="bg-danger mx-auto pt-5 pb-4">
            <h5 className="text-light text-center">Something went wrong</h5>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container fluid>
      <Row>
        {/* <Col sm={12} key={item._id} className={`d-flex gap-2 ${(i + 1) % 2 === 1 ? "bg-light" : 'bg-secondary-subtle'}`}>
              <p className="fw-semibold">{item.name}</p>
              <p>{item.phone}</p>
              {item.email && <p>{item.email}</p>}
              <p className="fst-italic">{item.companyPerson}</p>
            </Col> */}
        <Col sm={12} className="px-2">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item, i) => (
                  <tr key={item._id}>
                    <td>{i}</td>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>{item.companyPerson}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminAllDesignersInfo;
