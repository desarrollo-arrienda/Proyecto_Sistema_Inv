export const type = {
  find: "FIND",
  selectClient: "SELECT_CLIENT",
  fechaCompra: "Cambio de Fecha de Compra",
  numeroFactura: "Cambio de Numero de Factura",
  setPN: "set Product Number",
  setProductData: "Sets especified product data partnumber's",
  setOperationType: "Sets the especified type of operation to do",
  prepareIngreso: "Sets Arrienda Rut to rutposeedor",
  setProductsHeader: "Sets the data for the products header",
  addNotification: "Add a notification component",
  removeNotification: "Remove notification for the index parameter",
  LOADING_CLIENTES: "loading",
  EDIT_ROW: "edit a row",
  SET_ROWS: "sets the rows",
};

export const initialInventory = {
  operationType: "",
  // clientesData: [],
  loadingClientes: true,
  // url: "",
  rutProveedor: "",
  fechaCompra: "",
  numeroFactura: "",
  rutPoseedor: "",
  partNumber: "",
  productData: "",
  loadingProductData: true,
  productsHeader: "",
  notifications: [],
  editingRows: [],
};

const InventoryReducer = (state, action) => {
  switch (action.type) {
    case type.find:
      const [product, index] = action.payload;
      let url = `/producto/partnumber/${product.partNumber}`;
      let products = [...state.productsData];

      return { ...state, productsData: products, url };
    case type.selectClient:
      return { ...state, rutProveedor: action.payload };
    case type.fechaCompra:
      return { ...state, fechaCompra: action.payload };
    case type.numeroFactura:
      return { ...state, numeroFactura: action.payload };
    case type.setPN:
      return { ...state, partNumber: action.payload };
    case type.setProductData:
      // const { loading, data } = action.payload;
      return { ...state, productData: action.payload };
    case type.setOperationType:
      return {
        ...state,
        operationType: action.payload,
      };
    case type.prepareIngreso:
      return { ...state, rutPoseedor: "78507660-5" };
    case type.setProductsHeader:
      return { ...state, productsHeader: action.payload };
    case type.addNotification:
      let actualNotis = [...state.notifications];
      let newNotification = {
        detail: action.payload?.detail,
        content: action.payload.content,
        notificationType: action.payload.notificationType,
      };
      actualNotis.push(newNotification);
      return { ...state, notifications: actualNotis };
    case type.removeNotification:
      let notificationIndex = action.payload;
      let arrayRemove = [...state.notifications];
      arrayRemove.splice(notificationIndex, 1);
      return { ...state, notifications: arrayRemove };
    case type.LOADING_CLIENTES:
      return { ...state, loadingClientes: action.payload };
    case type.EDIT_ROW:
      let editingArray = [...state.editingRows];
      if (editingArray.includes(action.payload)) {
        editingArray.splice(editingArray.indexOf(action.payload), 1);
      } else {
        editingArray.push(action.payload);
      }
      return { ...state, editingRows: editingArray };
    default:
      return state;
  }
};

export default InventoryReducer;
