import React, { Component } from 'react';

class EmployeeList extends Component {
    constructor(props){
        super(props);
        this.state = {
            isVisibleRecords : false
        }
        this.onClick = this.onClick.bind(this);
        // this.deleteRow = this.deleteRow.bind(this);
    }

    onClick = (e) =>{
        e.preventDefault();
        // console.log(this.props.records);
        this.setState({
            isVisibleRecords: !this.state.isVisibleRecords
        });
    }

    deleteRow = (index) => {
        this.props.onClick(index);
    }
    
    editRow = (index) => {
        console.log("I am edit action propagation");
        this.props.onEdit(index);
    }

    render() {
            let recordList = ["loeRecords"];
            console.log(recordList);
            if(this.state.isVisibleRecords){
                recordList.push('visible');
            }
        return (
            <div className="listOfEmployee">
                <div className="loeHeader">
                    <a className="loeDisplayBtn" href="true" onClick={this.onClick}>See all records</a>
                </div>

                <div className={recordList.join(' ')}>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone No.</th>
                                <th>Photo</th>
                                <th>Acions</th>
                            </tr>
                        </thead>
                            <tbody>
                                {
                                    this.props.records.map((record, index) =>
                                    <tr key={index}>
                                        <td>{record.name}</td>
                                        <td>{record.email}</td>
                                        <td>{record.phone}</td>
                                        <td>{record.photo}</td>
                                        <td>
                                            <button onClick={() => this.deleteRow(index)}>Delete</button>
                                            <button onClick={() => this.editRow(index)}>Edit</button>
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default EmployeeList;