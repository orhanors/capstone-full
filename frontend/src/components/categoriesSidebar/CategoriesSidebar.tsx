import React, { useState } from "react";
import { Accordion, Card, Form } from "react-bootstrap";
import "./categorySidebar.scss";
function CategoriesSidebar() {
	const [checked, setChecked] = useState(false);
	return (
		<div className='category-sidebar-wrapper'>
			<Accordion defaultActiveKey='0'>
				<Card>
					<Accordion.Toggle as={Card.Header} eventKey='0'>
						Category
					</Accordion.Toggle>
					<Accordion.Collapse eventKey='0'>
						<Card.Body>
							<Form.Check
								custom
								inline
								label='1fdsadfas'
								type='checkbox'
								id={`custom-inline-checkbox-1`}
							/>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
				<Card>
					<Accordion.Toggle as={Card.Header} eventKey='1'>
						Type
					</Accordion.Toggle>
					<Accordion.Collapse eventKey='1'>
						<Card.Body>Hello! I'm another body</Card.Body>
					</Accordion.Collapse>
				</Card>

				<Card>
					<Accordion.Toggle as={Card.Header} eventKey='2'>
						Price
					</Accordion.Toggle>
					<Accordion.Collapse eventKey='2'>
						<Card.Body>Hello! I'm the body</Card.Body>
					</Accordion.Collapse>
				</Card>
			</Accordion>
		</div>
	);
}

export default CategoriesSidebar;
