import React, { useState } from 'react';
import { MultiSigGenerator } from "./index";
import TextField from '@material-ui/core/TextField';
import { createShallow } from '@material-ui/core/test-utils';
import Button from '@material-ui/core/Button';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe('<MultiSigGenerator /> rendering', () => {

    it('should render Signature Number Select', () => {
        const shallow = createShallow()
        const wrapper = shallow(<MultiSigGenerator/>)
        expect(wrapper.find("#signatureNumber")).toHaveLength(1);
    });  
    
    it('should render Redeem Script input', () => {
        const shallow = createShallow()
        const wrapper = shallow(<MultiSigGenerator/>)
        expect(wrapper.find("#redeemScript")).toHaveLength(1);
    });      

    it('should render a <Button />', () => {
        const shallow = createShallow();
        const wrapper = shallow(<MultiSigGenerator/>);
        expect(wrapper.find(Button)).toHaveLength(1);
    });
});