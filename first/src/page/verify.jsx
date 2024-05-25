import React, { Component } from 'react';
import axios from 'axios';

class Pegawai extends Component {
  constructor() {
    super();
    this.state = {
      pegawai: [],
      nip: "",
      namaPerusahaan: "",
      namaFranchise: "",
      alamat: "",
      noWA: "",
      noTLP: "",
      email: "",
      alamatWEB: "",
      deskripsi: "",
      logo: "",
      banner: "",
      action: ""
    };
    this.modalRef = React.createRef();
  }

  componentDidMount() {
    this.getPegawai();
  }

  bind = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  Add = (item = null, action = "insert") => {
    if (item) {
      this.setState({
        nip: item.nip,
        namaPerusahaan: item.namaPerusahaan,
        namaFranchise: item.namaFranchise,
        alamat: item.alamat,
        noWA: item.noWA,
        noTLP: item.noTLP,
        email: item.email,
        alamatWEB: item.alamatWEB,
        deskripsi: item.deskripsi,
        logo: item.logo,
        banner: item.banner,
        action: action
      });
    } else {
      this.setState({
        nip: "",
        namaPerusahaan: "",
        namaFranchise: "",
        alamat: "",
        noWA: "",
        noTLP: "",
        email: "",
        alamatWEB: "",
        deskripsi: "",
        logo: "",
        banner: "",
        action: "insert"
      });
    }
    this.modalRef.current.style.display = "block";
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

  SavePegawai = (event) => {
    event.preventDefault();
    let url = "";
    if (this.state.action === "insert") {
      url = "http://localhost:2910/pegawai/save"
    } else if (this.state.action === "verify") {
      url = "http://localhost:2910/pegawai/verify"
    } else {
      url = "http://localhost:2910/pegawai/update"
    }

    let form = {
      nip: this.state.nip,
      namaPerusahaan: this.state.namaPerusahaan,
      namaFranchise: this.state.namaFranchise,
      alamat: this.state.alamat,
      noWA: this.state.noWA,
      noTLP: this.state.noTLP,
      email: this.state.email,
      alamatWEB: this.state.alamatWEB,
      deskripsi: this.state.deskripsi,
      logo: this.state.logo,
      banner: this.state.banner,
    }

    axios.post(url, form)
      .then(response => {
        this.getPegawai();
        this.modalRef.current.style.display = "none";
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="m-3 card">
        <div className="card-header bg-info text-white">Data Pegawai</div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>NIP</th>
                <th>Nama Perusahaan</th>
                <th>Nama Franchise</th>
                <th>Alamat</th>
                <th>No WA</th>
                <th>No Tlp</th>
                <th>Email</th>
                <th>Alamat Web</th>
                <th>Deskripsi</th>
                <th>Logo</th>
                <th>Banner</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {this.state.pegawai.map((item, index) => (
                <tr key={index}>
                  <td>{item.nip}</td>
                  <td>{item.namaPerusahaan}</td>
                  <td>{item.namaFranchise}</td>
                  <td>{item.alamat}</td>
                  <td>{item.noWA}</td>
                  <td>{item.noTLP}</td>
                  <td>{item.email}</td>
                  <td>{item.alamatWEB}</td>
                  <td>{item.deskripsi}</td>
                  <td>{item.logo}</td>
                  <td>{item.banner}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-info m-1"
                      onClick={() => this.Add(item, "update")}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger m-1"
                      onClick={() => this.Drop(item.nip)}
                    >
                      Hapus
                    </button>
                    <button
                      className="btn btn-sm btn-success m-1"
                      onClick={() => this.Add(item, "verify")}
                    >
                      Verify
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="modal" id="modal" ref={this.modalRef}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  {this.state.action === "insert" ? "Tambah Data Pegawai" : this.state.action === "verify" ? "Verify Data Pegawai" : "Edit Data Pegawai"}
                </div>
                <form onSubmit={this.SavePegawai}>
                  <div className="modal-body">
                    NIP
                    <input
                      type="number"
                      name="nip"
                      value={this.state.nip}
                      onChange={this.bind}
                      className="form-control"
                      required
                    />
                    Nama Perusahaan
                    <input
                      type="text"
                      name="namaPerusahaan"
                      value={this.state.namaPerusahaan}
                      onChange={this.bind}
                      className="form-control"
                      required
                    />
                    Nama Franchise
                    <input
                      type="text"
                      name="namaFranchise"
                      value={this.state.namaFranchise}
                      onChange={this.bind}
                      className="form-control"
                      required
                    />
                    Alamat
                    <input
                      type="text"
                      name="alamat"
                      value={this.state.alamat}
                      onChange={this.bind}
                      className="form-control"
                      required
                    />
                    No WA
                    <input
                      type="text"
                      name="noWA"
                      value={this.state.noWA}
                      onChange={this.bind}
                      className="form-control"
                      required
                    />
                    No Tlp
                    <input
                      type="text"
                      name="noTLP"
                      value={this.state.noTLP}
                      onChange={this.bind}
                      className="form-control"
                      required
                    />
                    Email
                    <input
                      type="email"
                      name="email"
                      value={this.state.email}
                      onChange={this.bind}
                      className="form-control"
                      required
                    />
                    Alamat Web
                    <input
                      type="text"
                      name="alamatWEB"
                      value={this.state.alamatWEB}
                      onChange={this.bind}
                      className="form-control"
                      required
                    />
                    Deskripsi
                    <textarea
                      name="deskripsi"
                      value={this.state.deskripsi}
                      onChange={this.bind}
                      className="form-control"
                      required
                    />
                    Logo
                    <input
                      type="text"
                      name="logo"
                      value={this.state.logo}
                      onChange={this.bind}
                      className="form-control"
                      required
                    />
                    Banner
                    <input
                      type="text"
                      name="banner"
                      value={this.state.banner}
                      onChange={this.bind}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-sm btn-success" type="submit">
                      Simpan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Pegawai;
