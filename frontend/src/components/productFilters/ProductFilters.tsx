import React from "react";
import {
	Accordion,
	AccordionItem,
	AccordionItemHeading,
	AccordionItemButton,
	AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import Checkbox from "../_common/checkbox/Checkbox";
function ProductFilters() {
	return (
		<Accordion allowMultipleExpanded={true} allowZeroExpanded={true}>
			<AccordionItem>
				<AccordionItemHeading>
					<AccordionItemButton>Shop By Category</AccordionItemButton>
				</AccordionItemHeading>
				<AccordionItemPanel>
					<div className='d-flex flex-column'>
						<Checkbox name='device' label='Device' />
						<Checkbox name='medicine' label='Medicine' />
						<Checkbox name='ppe' label='PPE' />
						<Checkbox name='other' label='Other' />
					</div>
				</AccordionItemPanel>
			</AccordionItem>

			<AccordionItem className='mb-2'>
				<AccordionItemHeading>
					<AccordionItemButton>Shop By Type</AccordionItemButton>
				</AccordionItemHeading>
				<AccordionItemPanel>
					<div className='d-flex flex-column'>
						<Checkbox name='personal-care' label='Personal Care' />
						<Checkbox name='health-care' label='Health Care' />
						<Checkbox name='medicine-type' label='Medicine' />
						<Checkbox name='device-type' label='Device' />
					</div>
				</AccordionItemPanel>
			</AccordionItem>

			<AccordionItem className='mb-2'>
				<AccordionItemHeading>
					<AccordionItemButton>Shop By Price</AccordionItemButton>
				</AccordionItemHeading>
				<AccordionItemPanel>
					<p>
						Exercitation in fugiat est ut ad ea cupidatat ut in
						cupidatat occaecat ut occaecat consequat est minim minim
						esse tempor laborum consequat esse adipisicing eu
						reprehenderit enim.
					</p>
				</AccordionItemPanel>
			</AccordionItem>
		</Accordion>
	);
}

export default ProductFilters;
