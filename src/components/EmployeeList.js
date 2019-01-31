import React, { Component } from 'react';

class EmployeeList extends Component {
    constructor(props){
        super(props);
        this.state = {
            isVisibleRecords : false
        }
        this.onClick = this.onClick.bind(this);
    }

    onClick = (e) =>{
        e.preventDefault();
        this.setState({
            isVisibleRecords: !this.state.isVisibleRecords
        });
    }
 // For callback delete method
    deleteRow = (e, index) => {
        this.props.onDelete(index);
    }
// For callback edit method
    editRow = (e, index) => {
        console.log("I am edit action propagation");
        this.props.onEdit(index);
    }


    render() {
        const imgStyle = {
            maxHeight: "40px",
            maxWidth: "40px",
            background:"#ffffff",
            padding:"5px",
            boxShadow:"0px 1px 4px rgba(0,0,0,0.3)"
          }
        let recordList = ["loeRecords"];
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
                                        <td><img alt='' src={record.photo} style={imgStyle}/></td>
                                        <td>
                                            <button onClick={(e) => this.deleteRow(e,index)}>Delete</button>
                                            <button onClick={(e) => this.editRow(e,index)}>Edit</button>
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