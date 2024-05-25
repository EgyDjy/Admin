import React, { Component } from 'react';
import axios from 'axios';

class Pegawai extends Component {
    constructor() {
        super();
        this.state = {
            pegawai: [],
            nip: "",
            nama: "",
            alamat: "",
            action: "",
        };
        this.modalRef = React.createRef();
    }

    componentDidMount() {
        this.getPegawai();
    }

    bind = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    getPegawai = () => {
        let url = "http://localhost:2910/pegawai";
        axios.get(url)
            .then(response => {
                this.setState({ pegawai: response.data.pegawai });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="m-5 p-3 card">
                <div className="mt-2 card-header bg-warning text-white">Data User</div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>NIP</th>
                                <th>Username</th>
                                <th>Password</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.pegawai.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.nip}</td>
                                    <td>{item.nama}</td>
                                    <td>{item.alamat}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        );
    }
}

export default Pegawai;