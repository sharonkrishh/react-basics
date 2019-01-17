import React, { Component } from 'react';
import EmployeeList from './EmployeeList';

class EmployeForm extends Component {
    constructor(props){
        super(props);
        this.state = {
                name:'',
                email:'',
                phone:'',
                photo:'',
                showData: [],
        }
        this.onSubmitHandle  = this.onSubmitHandle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange = (e) =>{
        e.preventDefault();
        this.setState({[e.target.name] : e.target.value});
    }

    onSubmitHandle = (e) =>{
        e.preventDefault();
        let {name, email, phone, photo} = this.state;
        
        let newEmployee={name, email, phone, photo};
        if (newEmployee.name === "" && newEmployee.email === "" && newEmployee.phone === "" && newEmployee.photo === "") {
            return false;
        } else{
            this.setState(prevState => ({
                showData: prevState.showData.concat(newEmployee)
            }),
            this.setState({
                name:'',
                email:'',
                phone:'',
                photo:''
            }));
        }
        


    }



    handleClick = (index) =>{
        let newShowData = this.state.showData;
        console.log(newShowData);
        if(index !== -1){
            newShowData.splice(index, 1);
            this.setState({showData: newShowData});
        }
    }

    editRecords = (index) => {
        console.log("I am edit action propagation from parent and index is", index);

    }

    render() {
        return (
            <div className="EmployeeFromPanel">
                <div className="employeeForm">
                    <form onSubmit={this.onSubmitHandle}>
                        <div className="form-row">
                            <label>Name</label>
                            <input name="name" type="text" onChange={this.handleChange} value={this.state.name}/>
                        </div>
                        <div className="form-row">
                            <label>Email</label>
                            <input name="email" type="email" onChange={this.handleChange} value={this.state.email}/>
                        </div>
                        <div className="form-row">
                            <label>Phone no.</label>
                            <input name="phone" type="text" onChange={this.handleChange} value={this.state.phone}/>
                        </div>
                        <div className="form-row">
                            <label>Your photo</label>
                            <input name="photo" type="file" onChange={this.handleChange}/>
                        </div>
                        <div className="form-row">
                            <button type="submit">Create record</button>
                        </div>
                    </form>
                    
                </div>
                <EmployeeList 
                    records = {this.state.showData} 
                    onClick = {this.handleClick}
                    onEdit = {this.editRecords}
                />
            </div>
        );
    }
}

export default EmployeForm;