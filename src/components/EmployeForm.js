import React, { Component } from 'react';
import EmployeeList from './EmployeeList';
import { joinSafe } from 'upath';

class EmployeForm extends Component {
    constructor(props){
        super(props);
        this.state = {
                name:'',
                email:'',
                phone:'',
                photo:'',
                showData:(localStorage.getItem('dataItems') !== null)? JSON.parse(localStorage.getItem('dataItems')): [] ,
                isEditElement: false,
                indexForEdit:'',
                submitBtnValue: "Create record"
        }
        this.onSubmitHandle  = this.onSubmitHandle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.deleteRecord = this.deleteRecord.bind(this);
        this.fileHandleChange = this.fileHandleChange.bind(this);
    }
// On input change method
    handleChange = (e) =>{
        e.preventDefault();
        this.setState({[e.target.name] : e.target.value});

    }
    fileHandleChange = (e) => {
        e.preventDefault();
        let image = e.target.files[0];
        this.setState({
            photo : URL.createObjectURL(image)
        });
        console.log("This is form file input");
    }
// Edit handler method
    editRecords = (index, e) => {
        console.log("I am edit action propagation from parent and index is", index);
        let dataList = this.state.showData;
        if(index !== ''){
            this.setState({
                isEditElement: !this.state.isEditElement,
                indexForEdit: index,
                submitBtnValue: 'Edit record'
            });
        }
        let arrayItem = dataList[index];
        this.setState({[this.state]: Object.assign(arrayItem)});
        this.setState({
            name:arrayItem.name,
            email:arrayItem.email,
            phone:arrayItem.phone,
            photo:arrayItem.photo
        });

    }
// For create and update method
    onSubmitHandle = (e) =>{
        e.preventDefault();
        let {name, email, phone, photo} = this.state;
        let {indexForEdit} = this.state;
        console.log(indexForEdit);
        let newRecord={name, email, phone, photo};
        console.log(newRecord);
        let newShowData = this.state.showData;
        console.log("newData",newShowData);
        
        // For creating update the record method
        if(this.state.isEditElement){
            newShowData.splice(indexForEdit, 1, newRecord);
            this.setState({showData:newShowData},
            this.setState({
                name:'',
                email:'',
                phone:'',
                photo:''
            }),
            this.setState({
                isEditElement: false,
            }));
        }else{
            // For creating new record method
            if (newRecord.name === "" && newRecord.email === "" && newRecord.phone === "" && newRecord.photo === "") {
                return false;
            } else{
                this.setState(prevState => ({
                    showData: prevState.showData.concat(newRecord)
                }),
                this.setState({
                    name:'',
                    email:'',
                    phone:'',
                    photo:''
                }));
                
            }
        }
    }
    // For delete method
    deleteRecord = (index) =>{
        let newShowData = this.state.showData;
        console.log(newShowData);
        if(index !== -1){
            newShowData.splice(index, 1);
            this.setState({showData: newShowData});
        }
    }

    componentDidUpdate(prevProps,prevState){
        localStorage.setItem("dataItems",JSON.stringify(this.state.showData));
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
                            <input name="photo" type="file" onChange={this.fileHandleChange} id="fileInput"/>
                        </div>
                        <div className="form-row">
                            <button type="submit">{this.state.submitBtnValue}</button>
                        </div>
                    </form>
                    
                </div>
                <EmployeeList 
                    records = {this.state.showData} 
                    onDelete = {this.deleteRecord}
                    onEdit = {this.editRecords}
                />
            </div>
        );
    }
}

export default EmployeForm;