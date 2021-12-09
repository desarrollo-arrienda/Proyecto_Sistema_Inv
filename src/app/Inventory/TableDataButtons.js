import React from "react";
import { notificationTypes } from "../Notification";
import { useDispatch } from "./InventoryProvider";
import { type } from "./InventoryReducer";
import PropTypes from "prop-types";
import { useAppState } from "../AppProvider";

const TableDataButtons = ({ row, reloadData, editRow }) => {
  const dispatch = useDispatch();
  const appState = useAppState()
  const handleRemove = async (sn) => {
    const result = await fetch(`/inventario/${sn}`, {
      method: "DELETE",
    })
      .then((data) => data.json())
      .catch((e) => console.log(e));
    // console.log(result);
    dispatch({
      type: type.addNotification,
      payload: {
        content: "❗ " + result.message,
        notificationType: notificationTypes.warning,
      },
    });
    reloadData();
  };
  const { numeroSerie } = row.original;
  if (!appState.admin) {
    return null
  }
  return (
    <td align="center">
      <div className="buttons are-small">
        <a
          title="Editar"
          className="button m-1 is-outlined is-small is-info"
          onClick={() => {
            console.log(row.index);
            editRow(row.index);
          }}
        >
          <span className="icon">
            <i className="fas fa-pen"></i>
          </span>
        </a>
        <a
          title="Eliminar"
          className="button m-1 is-outlined is-small is-danger"
          onClick={() => {
            const validarRemove = confirm(
              `¿Está seguro que desea borrar el registro: ${numeroSerie}?`
            );
            if (validarRemove) {
              handleRemove(numeroSerie);
            } else {
              dispatch({
                type: type.addNotification,
                payload: {
                  content: `🛑 Se cancelo la operación`,
                  notificationType: notificationTypes.info,
                },
              });
            }
          }}
        >
          <span className="icon">
            <i className="fas fa-minus-circle"></i>
          </span>
        </a>
      </div>
    </td>
  );
};
TableDataButtons.propTypes = {
  row: PropTypes.object,
  reloadData: PropTypes.func,
  editRow: PropTypes.func,
};

export default TableDataButtons;