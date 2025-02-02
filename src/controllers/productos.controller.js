import { Document, Mongoose } from "mongoose";
import Productos from "../model/productos";

export async function getProductoById(req, res) {
	const id = req.params.id;
	// const productType = req.params.productType;
	const result = await Productos.findById(id);
	console.log(result.toObject({ getters: false }));
	res.json(result.toObject({ getters: false }));
}

export async function getAllProducts(req, res) {
	const result = await Productos.find({});
	// res.json({
	//   result: result.map((item) => ({
	//     item,
	//     description: item.DescriptionL,
	//     descriptionS: item.DescriptionS,
	//   })),
	//   headers: result[0] ? result[0].headersOf() : ["Not Found"],
	// });
	res.json(result);
}
export async function getProductPN(req, res) {
	const result = await Productos.findOne({ partnumber: req.params.pn });
	////console.log(result);
	res.json({
		item: result,
		description: result?.DescriptionL,
		descriptionS: result?.DescriptionS,
		headers: result?.headersOf() || ["Not Found"],
	});
}

export async function getProductoByQuery(req, res) {
	// const query = req.query;
	try {
		const result = await Productos.find({
			tipoProducto: req.params.productType,
		});

		// ////console.log(result[0].descriptionOf());
		// JSON.stringify(result) == '[]' ? res.json([]) :
		res.json({
			result: result.map((item) => ({
				item,
				description: item.DescriptionL,
				descriptionS: item.DescriptionS,
			})),
			headers: result[0] ? result[0].headersOf() : ["Not Found"],
		});
	} catch (error) {
		console.error(error);
		res.status(400).json(error);
	}
}
export async function getFamilyList(req, res) {
	// res.json({ message: "ruta lista familia funcionando" });
	const resultList = await Productos.find({
		tipoProducto: req.params.productType,
	});
	res.json(resultList.map((e) => e.familia));
}

export async function createProducto(req, res) {
	const data_in = req.body;
	console.log(data_in);
	const data_ot = new Productos(data_in);
	await data_ot.save().then(
		() => res.json({ mensaje: "Producto creado exitosamente" }),
		(error) => {
			res
				.status(400)
				.json(
					error.code == 11000
						? { mensaje: "PartNumber ya existe", reason: error.keyValue }
						: error
				);
		}
	);
	////console.log(data_in);
}

export async function updateProducto(req, res) {
	const id = req.params.id;
	const body = req.body;
	const product = await Productos.findOne({ _id: id });
	// console.log(product.toObject());
	for (let key in body) {
		product[key] = body[key];
	}
	const result = await product.save();

	// product.shortDescription = body.shortDescription;
	// const result = await product.save();
	////console.log(req.body);
	// const result = await Productos.updateOne({ _id: id }, req.body).catch(
	// 	(err) => {
	// 		console.error(err);
	// 		res.status(400).json(err);
	// 	}
	// );

	console.log(result);
	res.json("");
}

export async function deleteProducto(req, res) {
	const id = req.params.id;
	await Productos.deleteOne({ _id: id });
	res.json({ status: "OK", message: `Document [${id}] deleted` });
}

export async function createBulkProducto(req, res) {
	const products = req.body;
	if (products.length < 1) {
		res.json({ message: "No se recibio ningún dato para ingresar" });
		return;
	}
	const result = Productos.insertMany(products, (err, resolve) => {
		if (err) {
			console.error(err);
			return res.json({ status: "fail", data: err });
		}
		return res.json({ status: "ok", data: result });
	});
	return;
}
