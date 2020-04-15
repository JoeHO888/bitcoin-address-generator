import React, { useState } from 'react';
import { HDGenerator } from "./index";
import TextField from '@material-ui/core/TextField';
import { createShallow } from '@material-ui/core/test-utils';
import Button from '@material-ui/core/Button';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe('<HDGenerator /> rendering', () => {

    it('should render seed input', () => {
        const shallow = createShallow()
        const wrapper = shallow(<HDGenerator/>)
        expect(wrapper.find("#seed")).toHaveLength(1);
    });

    it('should render address input', () => {
        const shallow = createShallow()
        const wrapper = shallow(<HDGenerator/>)
        expect(wrapper.find("#address")).toHaveLength(1);
    });  
    
    it('should render path input', () => {
        const shallow = createShallow()
        const wrapper = shallow(<HDGenerator/>)
        expect(wrapper.find("#path")).toHaveLength(1);
    });      

    it('should render two <Button />', () => {
        const shallow = createShallow();
        const wrapper = shallow(<HDGenerator/>);
        expect(wrapper.find(Button)).toHaveLength(2);
    });
});