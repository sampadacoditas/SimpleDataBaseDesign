/* eslint-disable react-hooks/exhaustive-deps */
import style from "./TableComponent.module.scss";
import { FieldArray, Form, Formik } from "formik";
import Chip from "../Chip/Chip";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useRef, useEffect, useState } from "react";
import { MainPageContext } from "../../Pages/MainPage/MainPage";
import http from "../../Services/module.service";
import { AppContext } from "../../Context/AppContext";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ISingleColumnTable, ISingleContraint, IConstraint, IConstraintData, IDatatypeData, ITableData, IDatatype } from "./TableComponent.types";
import ThemeSelector from "../../utils/constants";
import { PopupContext } from "../../Context/PopupContext/PopupContext";
import { GrAdd } from 'react-icons/gr';


const TableComponent = () => {
  const functionRef = useRef<any>({});
  const { popupDispatch } = useContext(PopupContext);
  const { storeArray } = useContext(AppContext);
  const toastObject = ThemeSelector();
  const [tableColumnData, setTableColumnData] = useState({
    datatype: [],
    constraints: [],
  });

  const [tableColData, setTableColData] = useState<ITableData>({
    tableId: storeArray[storeArray.length - 1].id,
    columns: [
      {
        fieldName: "",
        datatype: 1,
        datatypeSize: "",
        constraints: [],
      },
    ],
    modifiedBy: "in cillum eiusmod",
  });

  const { setHeaderElement } = useContext(MainPageContext);

  const options = {
    dataTypes: tableColumnData?.datatype,
    constraints: tableColumnData?.constraints,
    // otherTables: [
    //   {
    //     tableName: "Table 1",
    //     tableId: "1",
    //     rows: ["User List", "Age", "ID", "Number", "AdharNumber"],
    //   },
    //   {
    //     tableName: "Table 2",
    //     tableId: "3",
    //     rows: ["User List", "Age", "ID", "Rashan Card Number", "AdharNumber"],
    //   },
    //   {
    //     tableName: "Table 3",
    //     tableId: "2",
    //     rows: ["User List", "Age", "ID", "Number", "AdharNumber"],
    //   },
    // ],
    // relation: [
    //   { id: "1", label: "One is To One" },
    //   { id: "2", label: "One is To Many" },
    // ],
  };

  const getData = async () => {
    try {
      const response = await http.get(
        `table-columns/${storeArray[storeArray.length - 1].id}`
      );
      console.log(response)
  
      const modifiedColumns = response.map((singleColumnTable: ISingleColumnTable) => {
        const constraint = singleColumnTable.constraints.map((singleRowContraint: ISingleContraint) => {
          return singleRowContraint.constraintParameterId;
        });
        return { ...singleColumnTable, constraints: constraint };
      });
      setTableColData({ ...tableColData, columns: modifiedColumns });
    } catch (error) {
      throw error;
    }
  };
console.log(tableColData.columns.length)
console.log(tableColData.columns)
  const valueName = (() => {
    const object: { [key: number]: string } = {};
    options.constraints.forEach(({ value, name }: IConstraint) => (object[value] = name));
    return object;
  })();

  const filteredOptions = (array: number[], main: IConstraint[]) => {
    const set = new Set(array);

    return main.filter((data: IConstraint) => !set.has(data.value));
  };

  const getDropDownData = async () => {
    try {
      const dataTypeData = await http.get("datatype-parameter");
      const constraintData = await http.get("constraint-parameter");

      const datatype = dataTypeData?.map((item: IDatatypeData) => {
        return { value: item.id, name: item.name };
      });

      const constraint = constraintData?.map((item: IConstraintData) => {
        return { value: item.id, name: item.name };
      });

      setTableColumnData({
        datatype: datatype,
        constraints: constraint,
      });

    } catch (Error) {
      throw Error;
    }
  };
  const handleSubmit = (data: ITableData) => {

    const filteredNewColumns = data.columns.filter((columnsData: ISingleColumnTable) => {
      return !columnsData.hasOwnProperty("id");
    });

    const newData = { ...data, columns: filteredNewColumns };

    http.post("table-columns", newData).then((response) => {
      toast.success('Successfully submitted', toastObject);
      setTimeout(() => {
        getData();
      }, 500)
    }).catch((error) => {
      toast.error('Failed to submit', toastObject)
    })
  };

  const deleteColumns = async (data: ISingleColumnTable) => {
    if (data.id) {
      try {
        const res = await http.delete(`table-columns/${data.id}`);
        toast.warning("Field Deleted!", toastObject);
        return res
      } catch (error) {
        toast.error("Failed To Delete", toastObject);
      }
    }
  };

  const UpdateColumns = async (data: ISingleColumnTable) => {
    const requestObject = {
      fieldName: data.fieldName,
      tableId: data.tableId,
      datatype: data.datatype,
      constraints: data.constraints,
      datatypeSize: data.datatypeSize
    };

    try {
      const res = await http.patch(`table-columns/${data.id}`, requestObject);
      toast.success("Field Updated!", toastObject);
      return res
    }
    catch (error) {
      toast.error("Failed To Update", toastObject);
    };
  };

  const handleDeleteChip = async (columnID: number, tableID: number, constraintParameterID: number) => {
    try {
      const res = await http.delete(`table-columns/${columnID}/${tableID}/${constraintParameterID}`);
      toast.warning("constraint To Deleted", toastObject);
      return res
    } catch (error) {
      toast.error("Failed To Delete constraint", toastObject);
    }
  }

  useEffect(() => {
    getDropDownData();
    getData();
    setHeaderElement(
      <>
        <button
          type="button"
          className="button-add-new-field"
          onClick={() => {
            functionRef.current.push({
              fieldName: "",
              datatype: 1,
              datatypeSize: "",
              constraints: [],
            });
            toast.info('New Field Added!', toastObject)
          }}
        >
          Add New Field<GrAdd/>
        </button>
        {
          tableColData.columns.length!==0 &&
          <button
          type="button"
          className="button-add-new-field"
          onClick={() =>
          {
            popupDispatch({
              type: "setPopup", payload: {
                isPopupOpen: true,
                actionType: "relationship",
                typeOfFile: "Table",
                selectedData: storeArray[storeArray.length - 1]
              }
            })
            toast.info('Add Relationship!', toastObject)
          }
        }
        >
          Add RelationShip <GrAdd/>
        </button>
        }
      </>
    );
  }, [tableColData.columns.length]);

  return (
    <div className={style["table-container"]}>
      <div className={style["table-row"] + " " + style["table-header"]}>
        <div className={style["row-data"]}>Field Name</div>
        <div className={style["row-data"]}>Data Type</div>
        <div className={style["row-data"]}>Size</div>
        <div className={style["row-attributes"]}>Constraints</div>
        <div className={style["row-delete"]}>Delete</div>
        <div className={style["row-delete"]}>Update</div>
      </div>

      <Formik
        initialValues={tableColData}
        enableReinitialize={true}
        onSubmit={(e: ITableData) => handleSubmit(e)}
      >
        {(formData) => (
          <Form
            className={style["table"]}
            onKeyDown={(keyEvent) => {
              if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
                keyEvent.preventDefault();
              }
            }}
          >
            <div className={style.field_container}>
              <FieldArray name="columns">
                {({ insert, remove, push }) => (
                  <>
                    {formData.values.columns.map((field: any, index: number) => {
                      functionRef.current = {
                        ...functionRef.current,
                        push: push,
                      };
                      return (
                        <div className={style["table-row"]} key={index}>
                          <div className={style["row-data"]}>
                            <input
                              name={`columns.${index}.fieldName`}
                              className={style.input}
                              type="string"
                              value={field.fieldName || ""}
                              onChange={formData.handleChange}
                              placeholder="UsersList"
                              required
                            />
                          </div>

                          <div className={style["row-data"]}>
                            <select
                              className={style.select}
                              onChange={(e) => {
                                formData.handleChange({
                                  currentTarget: {
                                    name: `columns.${index}.datatype`,
                                    value: +e.target.value,
                                  },
                                })
                              }
                              }
                              value={field.datatype}
                              name={`columns.${index}.datatype`}
                              required
                            >
                              {options.dataTypes.map((datatype: IDatatype, index) => {
                                return (
                                  <option key={index} value={datatype.value}>
                                    {datatype.name}
                                  </option>
                                )
                              })}
                            </select>
                          </div>

                          <div className={style["row-data"]}>
                            <input
                              name={`columns.${index}.datatypeSize`}
                              className={style.input}
                              type="number"
                              value={field.datatypeSize || ''}
                              onChange={formData.handleChange}
                              placeholder="Size"
                              min="1"
                              max="255"
                              required
                            />
                          </div>

                          <div className={style["row-attributes"]}>
                            <div className={style.dropdown}>
                              <select
                                className={style.select}
                                onChange={(e) => {
                                  formData.handleChange({
                                    currentTarget: {
                                      name: `columns.${index}.constraints`,
                                      value: [
                                        ...field.constraints,
                                        +e.target.value,
                                      ],
                                    },
                                  })
                                }
                                }
                                value={""}
                                name={`columns.${index}.constraints`}
                              >
                                <option value="" hidden >Select a constraints</option>
                                {
                                  filteredOptions(
                                    field.constraints,
                                    options.constraints
                                  ).map((datatype: IConstraint, index: number) => (
                                    <option key={index} value={datatype.value}>
                                      {datatype.name}
                                    </option>
                                  ))}
                              </select>

                            </div>
                            <div className={style["attribute-holder"]}>
                              {field.constraints.map((attr: number) => {
                                return (
                                  <Chip
                                    key={attr}
                                    label={valueName[attr]}
                                    deleteFn={() => {
                                      formData.handleChange({
                                        currentTarget: {
                                          name: `columns.${index}.constraints`,
                                          value: field.constraints.filter(
                                            (value: number) => value !== attr
                                          ),
                                        },
                                      })

                                      if (field.id) {
                                        const columnID = field.id;
                                        const tableID = formData.values.tableId;
                                        const constraintParameterID = attr;
                                        handleDeleteChip(columnID, tableID, constraintParameterID);
                                      }
                                    }
                                    }
                                  />
                                )
                              })}
                            </div>
                          </div>

                          <div className={style["row-delete"]}>
                            <DeleteIcon
                              onClick={() => {
                                remove(index);
                                deleteColumns(field);
                              }}
                            />
                          </div>
                          <div className={style["row-delete"]}>
                            {
                              field.id &&
                              <BorderColorIcon
                                onClick={() => {
                                  UpdateColumns(field);
                                }
                                }
                              />
                            }
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </FieldArray>
            </div>
            <div className={style["submit"]}>
              <button
                className={style["submitButton"]}
                type="submit"
                disabled={formData.values.columns.length === 0 || formData.values.columns[formData.values.columns.length - 1].hasOwnProperty("id")}
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TableComponent;
