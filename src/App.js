import React, { useState } from "react";
import { nanoid } from "nanoid";
import { Container, Col, Row, Form, Button, Table } from "react-bootstrap";

export default function App() {
  const [invoice, setInvoice] = useState([]);
  const [formData, setFormData] = useState({
    itemId: nanoid(),
    itemName: "",
    price: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
    console.log(formData);
  };

  const addToInvoice = () => {
    if (formData.itemName && formData.price) {
      setInvoice((prevInvoice) => {
        return [...prevInvoice, { ...formData, itemId: nanoid() }];
      });

      setFormData({ itemName: "", price: "" });

      console.log(invoice);
    } else {
      alert("Please fill in all the fields.");
    }
  };

  const deleteFromInvoice = (invoiceIdToDelete) => {
    setInvoice((prevInvoice) =>
      prevInvoice.filter(
        (invoiceItem) => invoiceItem.itemId !== invoiceIdToDelete
      )
    );
  };

  const sumTotal = invoice.reduce(function (total, obj) {
    return parseFloat(total) + parseFloat(obj.price);
  }, 0);

  const renderItemList = invoice.map((invoiceItem) => {
    return (
      <tr>
        <td>
          <i
            className="fa fa-fw fa-trash-o cursor-pointer"
            onClick={() => deleteFromInvoice(invoiceItem.itemId)}
          ></i>
        </td>
        <td>{invoiceItem.itemName}</td>
        <td>$ {invoiceItem.price}</td>
      </tr>
    );
  });

  return (
    <Container
      fluid
      className="p-4 full-height d-flex flex-column justify-content-between"
    >
      <h1>Create an Invoice</h1>
      <Form className="p-4">
        <Row>
          <Col lg="6" sm="12">
            <Form.Group>
              <Form.Label>Item name *</Form.Label>
              <Form.Control
                type="text"
                controlid="formBasicText"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col lg="3" sm="12">
            <Form.Group>
              <Form.Label>Price (USD $) *</Form.Label>
              <Form.Control
                type="number"
                controlid="formBasicNumber"
                name="price"
                onChange={handleChange}
                value={formData.price}
                required
              />
            </Form.Group>
          </Col>
          <Col
            lg="3"
            sm="12"
            className="d-flex flex-column justify-content-between"
          >
            <br />
            <Button onClick={addToInvoice}>Add line</Button>
          </Col>
        </Row>
      </Form>
      <hr />
      <main className="text-center">
        {invoice.length > 0 ? (
          <Table bordered striped hover>
            <thead>
              <tr>
                <th>Delete</th>
                <th>Item Name</th>
                <th>Item Price</th>
              </tr>
            </thead>
            <tbody>
              {renderItemList}{" "}
              <tr>
                <td colSpan="2">Total:</td>
                <td colSpan="1">$ {sumTotal}</td>
              </tr>
            </tbody>
          </Table>
        ) : (
          <div>
            <h1>Add items in the form above</h1>
            <h2 className="text-muted">No items in the invoice</h2>
          </div>
        )}
        <br />
      </main>
      <footer className="p-3">
        <small>
          Developed with ❤ by{" "}
          <a
            href="https://github.com/DiestroCorleone"
            title="GitHub Profile Diestro Corleone"
            target="_blank"
            rel="noreferrer"
          >
            Diestro
          </a>
        </small>
      </footer>
    </Container>
  );
}
