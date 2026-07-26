import React from "react";
import { Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  useGetTeamMembersQuery,
  useDeleteTeamMemberMutation,
} from "../../data/apiTeamSlice";

const AdminTeamList = () => {
  const navigate = useNavigate();
  const { data: team, isLoading } = useGetTeamMembersQuery();
  const [deleteTeamMember, { isLoading: deleting }] =
    useDeleteTeamMemberMutation();

  if (isLoading) return <Spinner />;

  return (
    <Row className="g-4">
      {team?.map((member) => (
        <Col key={member._id} sm={12} md={6} lg={4}>
          <Card className="h-100 shadow-sm">
            <Card.Img
              variant="top"
              src={member.image}
              style={{ height: 200, objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title className="fs-6">
                {member.name?.ge}
              </Card.Title>
              <Card.Text className="mb-1">
                <strong>Type:</strong> {member.type}
              </Card.Text>
              <Card.Text className="mb-3">
                {member.position?.ge}
              </Card.Text>

              <div className="d-flex gap-2">
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() =>
                    navigate(`/admin/team/edit/${member._id}`)
                  }
                >
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="danger"
                  disabled={deleting}
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this team member?"
                      )
                    ) {
                      deleteTeamMember(member._id);
                    }
                  }}
                >
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default AdminTeamList;
