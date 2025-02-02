import React, { Component } from "react";
import Cliente from "./Cliente";
import FormCliente from "./formcliente";
import PlusCliente from "./PlusCliente";
import Pagination from "./Pagination";
import PropTypes from "prop-types";

class JsonCliente extends Component {
	constructor(props) {
		super(props);
		this.crearCliente = this.crearCliente.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.fetchClientes = this.fetchClientes.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.updateCliente = this.updateCliente.bind(this);
		this.cancelarAccion = this.cancelarAccion.bind(this);
		this.deleteCliente = this.deleteCliente.bind(this);
		this.paginate = this.paginate.bind(this);
		this.state = {
			data: [
				<tr key={new Date()}>
					<td>No ha cargado nada aun</td>
				</tr>,
			],
			actualData: [],
			select: "rut",
			razon_social: "",
			rut: "",
			ubicacion: "",
			telefono_contacto: "",
			persona_contacto: "",
			createdat: "",
			crearcliente: this.props.accessEmpresas[2] && (
				<PlusCliente key={"agregar"} cC={this.crearCliente} />
			),
			input: "",
			input2: "",
			input3: "",
			input4: "",
			input5: "",
			notification: "",
			loading: true,
			currentPage: 1,
			clientesPerPage: 20,
		};
		// this.crearCliente = this.crearCliente.bind(this)
	}

	//Pagination
	paginate = (number) => {
		// const prevState = this.state.currentPage
		this.setState({ currentPage: number });
		// this.setState({
		//    currentPage: number
		// }, () => { this.updateCurrentPage() })
		// document.getElementById(`${this.state.currentPage}`).classList.remove('is-current')
	};
	// updateCurrentPage = () => {
	//    // console.log(this.state.currentPage)
	//    document.getElementById(`${this.state.currentPage}`).classList.add('is-current')
	// }

	componentDidMount() {
		this.fetchClientes();
		console.log(this.props.accessEmpresas);
	}
	// componentDidUpdate(prevProps, prevState){
	//    if(this.state.actualData == prevState.actualDatas){
	//       this.sortingClientes('razon_social')
	//    }
	// }
	// componentDidUpdate(prevProps, prevState){
	//    if(this.state.actualData != prevState.actualData){
	//       this.setState({ actualData : this.state.data})
	//    }

	// }
	fetchClientes = async () => {
		this.setState({ loading: true });
		const results = await fetch("/empresa/").then((res) => res.json());
		// const datos = results.map((cliente) => {return <Cliente key={cliente.rut} {...cliente}/>})
		this.setState({
			input: "",
			input2: "",
			input3: "",
			input4: "",
			input5: "",
		});
		const sortedData = [...results];
		sortedData.sort((a, b) => {
			if (a["razon_social"] > b["razonsocial"]) {
				return 1;
			}
			if (a["razon_social"] < b["razonsocial"]) {
				return -1;
			}
			return 0;
		});
		this.setState({ data: sortedData });
		this.setState({ loading: false });
		console.log("Se Ejecuto Fetch cliente");
		this.setState({ actualData: this.state.data });
	};
	postClientes = async (data) => {
		const results = await fetch("/empresa", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		return results.json;
	};

	handleChange = (e) => {
		this.setState({ select: e.target.value });
	};
	handleChangeInput = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};
	createQuery = async () => {
		const {
			razon_social,
			rut,
			ubicacion,
			telefono_contacto,
			persona_contacto,
			createdat,
		} = this.state;
		// console.log(createdat);
		let fullquery = "";
		if (razon_social != "" && razon_social.length > 2) {
			fullquery += `razon_social=${razon_social}&`;
		}
		if (rut != "") {
			fullquery += `rut=${rut}&`;
		}
		if (ubicacion != "") {
			fullquery += `ubicacion=${ubicacion}&`;
		}
		if (telefono_contacto != "") {
			fullquery += `telefono_contacto=${telefono_contacto}&`;
		}
		if (persona_contacto != "") {
			fullquery += `persona_contacto=${persona_contacto}&`;
		}
		if (createdat != "") {
			fullquery += `createdat=${createdat}&`;
		}
		console.log(fullquery);
		// if(objectQuery.razon_social === "" && objectQuery.rut === "" && objectQuery.ubicacion === "" && objectQuery.telefono_contacto === ""){
		if (fullquery == "") {
			const results = await fetch("/empresa").then((res) => res.json());
			// const datos = results.map((cliente) => {return <Cliente key={cliente.rut} {...cliente}/>})
			this.setState({ data: results }, () => {
				this.setState({ actualData: this.state.data });
			});
			console.log(true);
		} else {
			const results = await fetch(`/empresa?${fullquery}`).then((res) =>
				res.json()
			);
			// const datos = results.map((cliente) => {return <Cliente key={cliente.rut} {...cliente}/>})
			this.setState({ data: results }, () => {
				this.setState({ actualData: this.state.data });
			});
			console.log(false);
		}
	};
	handleClick = () => {
		// console.log(this.inputValidation())
		if (this.inputValidation() === true) {
			const inputs = {
				razon_social: this.state.input,
				rut: this.state.input2,
				ubicacion: this.state.input3,
				telefono_contacto: this.state.input4,
				persona_contacto: this.state.input5,
			};
			// console.log('input validation true')
			console.log(inputs);
			this.postClientes(inputs).then((data) => {
				console.log(data);
				this.fetchClientes();
				this.setState({
					crearcliente: <PlusCliente cC={this.crearCliente} />,
				});
			});
			this.setState({
				input: "",
				input2: "",
				input3: "",
				input4: "",
				input5: "",
			});
		} else {
			// console.log('input validation false')
			this.setState({
				notification: this.inputValidation(),
			});
		}
	};
	crearCliente() {
		this.setState({
			input: "",
			input2: "",
			input3: "",
			input4: "",
			input5: "",
		});
		this.setState({
			crearcliente: (
				<FormCliente
					props={this.state}
					crearCliente={this.crearcliente}
					handleClick={this.handleClick}
					cancelarAccion={this.cancelarAccion}
					updateInputValue={this.updateInputValue}
					updateInputValue2={this.updateInputValue2}
					updateInputValue3={this.updateInputValue3}
					updateInputValue4={this.updateInputValue4}
					updateInputValue5={this.updateInputValue5}
				/>
			),
		});
	}
	deleteCliente(rut, razon_social) {
		if (
			confirm(
				`Esta seguro de que desea eliminar el cliente ${razon_social} con el rut: ${rut}`
			)
		) {
			const result = fetch(`/empresa/${rut}`, {
				method: "DELETE",
			})
				.then((result) => result.json())
				.then(() => this.fetchClientes());
			console.log(result);
		}
	}
	async updateCliente() {
		const inputs = {
			razon_social: this.state.input,
			rut: this.state.input2,
			ubicacion: this.state.input3,
			telefono_contacto: this.state.input4,
			persona_contacto: this.state.input5,
		};
		await fetch(`/empresa/${inputs.rut}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(inputs),
		}).then((data) => {
			console.log(data);
			this.fetchClientes();
			this.setState({
				crearcliente: <PlusCliente cC={this.crearCliente} />,
			});
		});
		this.setState({
			input: "",
			input2: "",
			input3: "",
			input4: "",
			input5: "",
		});
	}
	async handleEdit(rut) {
		await fetch(`/empresa/${rut}`)
			.then((res) => res.json())
			.then((data) => {
				this.setState({
					actualData: [],
					input: data.razon_social,
					input2: data.rut,
					input3: data.ubicacion,
					input4: data.telefono_contacto,
					input5: data.persona_contacto,
				});
			});
		this.setState({
			crearcliente: (
				<FormCliente
					crearCliente={this.crearCliente}
					handleClick={this.updateCliente}
					cancelarAccion={this.cancelarAccion}
					props={this.state}
					updateInputValue={this.updateInputValue}
					updateInputValue2={this.updateInputValue2}
					updateInputValue3={this.updateInputValue3}
					updateInputValue4={this.updateInputValue4}
					updateInputValue5={this.updateInputValue5}
				/>
			),
		});
	}
	updateInputValue = (e) => {
		this.setState({
			input: e.target.value.trim(),
		});
	};
	updateInputValue2 = (e) => {
		this.setState({
			input2: e.target.value.trim(),
		});
	};
	updateInputValue3 = (e) => {
		this.setState({
			input3: e.target.value.trim(),
		});
	};
	updateInputValue4 = (e) => {
		this.setState({
			input4: Number.parseInt(e.target.value),
		});
	};
	updateInputValue5 = (e) => {
		this.setState({
			input5: e.target.value.trim(),
		});
	};
	cancelarAccion = () => {
		this.fetchClientes();
		this.setState({
			input: "",
			input2: "",
			input3: "",
			input4: "",
			input5: "",
		});
		this.setState({
			crearcliente: <PlusCliente cC={this.crearCliente} />,
			notification: "",
		});
	};
	inputValidation = () => {
		const displayError = (message) => {
			return (
				<div
					style={{
						margin: "1px",
						position: "fixed",
						right: "3%",
					}}
					className="notification is-danger"
				>
					{message}
					<button
						className="delete"
						onClick={() => {
							this.setState({ notification: "" });
						}}
					></button>
				</div>
			);
		};
		if (
			this.state.input === "" ||
			this.state.input2 === "" ||
			this.state.input3 === "" ||
			this.state.input4 === ""
		) {
			return displayError(
				"Ningun campo puede estar vacio, por favor verifique los campos"
			);
		}
		if (this.state.input.trim().length < 3) {
			return displayError(
				"Debe ingresar al menos 3 caracteres para Razon Social"
			);
		}
		if (!/^(\d{5,9}-[\dkK])$/.test(this.state.input2.trim())) {
			return displayError(
				"Debe ingresar un formato válido para el RUT. Ejemplo: 12345678-9"
			);
		} else {
			return true;
		}
	};
	changeClientesPerPage = (e) => {
		this.setState({
			clientesPerPage: parseInt(e.target.value),
		});
	};

	sortingClientes = (id) => {
		let icon = document.getElementById(id).children[0].children[0].children[0];
		let sortedData = [...this.state.data];
		if (icon.classList.contains("fa-chevron-down")) {
			sortedData.sort((a, b) => {
				if (a[id] > b[id]) {
					return -1;
				}
				if (a[id] < b[id]) {
					return 1;
				}
				return 0;
			});
			this.setState({
				actualData: sortedData,
			});
			icon.classList.remove("fa-chevron-down");
			icon.classList.add("fa-chevron-up");
		} else if (icon.classList.contains("fa-chevron-up")) {
			this.setState({ actualData: this.state.data });
			icon.classList.remove("fa-chevron-up");
		} else {
			icon.classList.add("fa-chevron-down");
			sortedData.sort((a, b) => {
				if (a[id] < b[id]) {
					return -1;
				}
				if (a[id] > b[id]) {
					return 1;
				}
				return 0;
			});
			this.setState({
				actualData: sortedData,
			});
		}
	};

	render() {
		return (
			<>
				<div className="box">
					<div className="title is-small">Empresas</div>

					<div className="box is-flex is-justify-content-center">
						<div className="table-container">
							<table className="table is-narrow clientes-table">
								<thead>
									<tr>
										<th id="razon_social">
											<a
												onClick={() => this.sortingClientes("razon_social")}
												className="has-text-black is-unselectable"
											>
												Razon Social
												<span className="icon">
													<i className="fas"></i>
												</span>
											</a>
											<div className="filtering">
												<input
													name="razon_social"
													type="text"
													className="input is-small filtering"
													defaultValue={this.state.razon_social}
													onChange={(e) => this.handleChangeInput(e)}
												/>
											</div>
										</th>
										<th id="rut">
											<a
												onClick={() => this.sortingClientes("rut")}
												className="has-text-black is-unselectable"
											>
												RUT
												<span className="icon">
													<i className="fas"></i>
												</span>
											</a>
											<div>
												<input
													name="rut"
													type="text"
													className="input is-small filtering rut-filter"
													value={this.state.rut}
													onChange={(e) => this.handleChangeInput(e)}
												/>
											</div>
										</th>
										<th id="ubicacion">
											<a
												onClick={() => this.sortingClientes("ubicacion")}
												className="has-text-black is-unselectable"
											>
												Casa Matriz
												<span className="icon">
													<i className="fas"></i>
												</span>
											</a>
											<div>
												<input
													name="ubicacion"
													type="text"
													className="input is-small filtering"
													value={this.state.ubicacion}
													onChange={(e) => this.handleChangeInput(e)}
												/>
											</div>
										</th>
										<th id="telefono_contacto">
											<a
												onClick={() =>
													this.sortingClientes("telefono_contacto")
												}
												className="has-text-black is-unselectable"
											>
												Teléfono
												<span className="icon">
													<i className="fas"></i>
												</span>
											</a>
											<div>
												<input
													name="telefono_contacto"
													type="text"
													className="input is-small filtering"
													value={this.state.telefono_contacto}
													onChange={(e) => this.handleChangeInput(e)}
												/>
											</div>
										</th>
										<th id="persona_contacto">
											<a
												onClick={() => this.sortingClientes("persona_contacto")}
												className="has-text-black is-unselectable"
											>
												Persona
												<span className="icon">
													<i className="fas"></i>
												</span>
											</a>
											<div>
												<input
													name="persona_contacto"
													type="text"
													className="input is-small filtering"
													value={this.state.persona_contacto}
													onChange={(e) => this.handleChangeInput(e)}
												/>
											</div>
										</th>
										{/* <th id="createdat">
											<a
												onClick={() => this.sortingClientes("createdat")}
												className="has-text-black is-unselectable"
											>
												Creado
												<span className="icon">
													<i className="fas"></i>
												</span>
											</a>
											<div>
												<input
													name="createdat"
													type="text"
													className="input is-small filtering"
													placeholder="aaaa-mm-dd"
													value={this.state.createdat}
													onChange={(e) => this.handleChangeInput(e)}
												/>
											</div>
										</th> */}
										<th colSpan="2">
											<div className="flex-container-buscar">
												<button
													className="button is-info buscar"
													onClick={this.createQuery}
												>
													<span className="icon">
														<i className="fas fa-search"></i>
													</span>
													<span>Buscar</span>
												</button>
											</div>
										</th>
									</tr>
								</thead>
								<tbody>
									<Cliente
										clientes={this.state.actualData}
										loading={this.state.loading}
										handleEdit={this.handleEdit}
										deleteCliente={this.deleteCliente}
										clientesPerPage={this.state.clientesPerPage}
										currentPage={this.state.currentPage}
										accessEmpresas={this.props.accessEmpresas}
									/>
									{this.state.crearcliente}
								</tbody>
							</table>
						</div>
					</div>
					<label htmlFor="itemsPerPage" className="label mb-0">
						Elementos por página
					</label>
					<div className="select is-small mb-2">
						<select
							id="itemsPerPage"
							value={this.state.clientesPerPage}
							onChange={this.changeClientesPerPage}
						>
							<option value={10}>10</option>
							<option defaultValue value={20}>
								20
							</option>
							<option value={50}>50</option>
						</select>
					</div>
					<Pagination
						itemsPerPage={this.state.clientesPerPage}
						totalItems={this.state.data.length}
						paginate={this.paginate}
						currentPage={this.state.currentPage}
					/>
				</div>
				{/* </div> */}
				<div className="is-flex is-justify-content-center">
					{this.state.notification}
				</div>
			</>
		);
	}
}

JsonCliente.propTypes = {
	accessEmpresas: PropTypes.arrayOf(PropTypes.bool).isRequired,
};

export default JsonCliente;
