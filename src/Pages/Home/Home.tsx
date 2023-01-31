/* eslint-disable react-hooks/exhaustive-deps */
import React, { BaseSyntheticEvent, useContext, useEffect, useRef, useState } from 'react'
import BackButton from '../../Components/button/BackButton';
import Icons from '../../Components/Icons/Icons';
import { Box, Breadcrumbs, FormControl, InputLabel, Link, MenuItem, MenuList } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import styles from "./Home.module.scss";
import { PopupContext } from "../../Context/PopupContext/PopupContext";
import Header from '../../Components/header/Header';
import { AppContext } from '../../Context/AppContext';
import Loading from '../../Components/Loader/Loading';
import MainPage from '../MainPage/MainPage';
import Select from '@mui/material/Select';
import ThemeSelector, { folderSizeData, options } from '../../utils/constants';
import http from '../../Services/module.service';
import QueryFile from "../../Components/queryFile/QueryFile";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import GridOnIcon from '@mui/icons-material/GridOn';
import { IDataObjectsProps } from '../../Context/AppContext.types';
import { DebounceInput } from 'react-debounce-input';
import NotFound from '../../Components/NotFound/NotFound';
import NoData from '../../Components/noData/NoData';
import zIndex from '@mui/material/styles/zIndex';

const Home: React.FC = () => {
  const { loading, data, storeArray, getInitialData, handlePageNavigate, handleCrumbNavigate, sort, setSort, showNotFound } = useContext(AppContext);
  const { popupDispatch } = useContext(PopupContext);
  const [layout, setLayout] = useState<string>('70,15');
  const [search, setSearch] = useState<string>('');
  const [contextMenuData, setContextMenuData] = useState({
    isShow: false,
    position: {
      top: "0px",
      left: "0px",
    },
    isIcon: false,
    selectedData: {
      id: "",
      name: "",
      type: "",
    },
  });

  const contextContainerRef = useRef<any>(null);
  const contextMenuRef = useRef<HTMLUListElement | null>(null);
  const toastObject = ThemeSelector();

  const handleSelectChange = (event: PointerEvent) => {
    const value = (event.target as HTMLInputElement).value
    setSort(value)
    const sortedValues = data[0].data.sort((a: Record<string, string>, b: Record<string, string>) => a[value].toLowerCase() > b[value].toLowerCase() ? 1 : -1);
    return sortedValues
  }

  const handleSearchChange = (data: IDataObjectsProps[]) => {
    const demoData = [...data]
    const searchValue = demoData?.filter((val: IDataObjectsProps) => val.name.includes(search))
    return searchValue
  }

  const { exportUserInfo } = QueryFile();

  const handleExportChange = async () => {
    const { id } = contextMenuData.selectedData
    toast('File being downloaded!', toastObject);

    if (contextMenuData.selectedData.hasOwnProperty("projectId")) {
      try {
        const val = Object.entries(contextMenuData.selectedData)
        const extractProjectId = val.filter((val) => val[0] === "projectId").flat()
        const res = await http.get(`projects/exportProject?exerciseId=${id}&projectId=${extractProjectId[1]}`);
        exportUserInfo(res, contextMenuData.selectedData.name);
        toast('File being downloaded!', toastObject);
      }
      catch (Error) {
        toast.error(`${Error}`, toastObject);
      }
    }
    else {
      try {
        const res = await http.get(`projects/exportProject?projectId=${id}`);
        exportUserInfo(res, contextMenuData.selectedData.name);
      }
      catch (error) {
        toast.error(`${Error}`, toastObject);
      }
    }
  };

  const handleOnContextMenu = (event: any) => {
    event.preventDefault();
    const containerWidth = contextContainerRef.current.clientWidth;
    const containerHeight = contextContainerRef.current.clientHeight;
    
    const topPx = event.pageY > (window.innerHeight - 150) ? (window.innerHeight - 150) : event.pageY ;
    const leftPx = event.pageX > (containerWidth - 200) ? (containerWidth - 200) : event.pageX;

    if (event.currentTarget === event.target) {
      setContextMenuData({
        ...contextMenuData,
        isShow: true,
        position: {
          top: topPx + "px",
          left: leftPx + "px",
        },
        isIcon: false,
      });
    }
  };

  const handleContextMenuIcon = (event: any, values: any) => {
    event.preventDefault();
    const containerWidth = contextContainerRef.current.clientWidth;
    const topPx = event.pageY > (window.innerHeight - 150) ? (window.innerHeight - 150) : event.pageY ;
    const leftPx = event.pageX > (containerWidth - 200) ? (containerWidth - 200) : event.pageX;

    setContextMenuData({
      isShow: true,
      position: {
        top: topPx + "px",
        left: leftPx + "px",
      },
      isIcon: true,
      selectedData: values
    })
  }

  const handleOnClick = (event: BaseSyntheticEvent) => {
    event.stopPropagation();
    setContextMenuData({
      ...contextMenuData,
      isShow: false,
      isIcon: false
    })
  }

  useEffect(() => {
    getInitialData();
  }, []);
  
  console.log(1);

  return (
    <>
      {(
        showNotFound.status ? <NotFound /> :
          <>
            <>
              <Header />
            </>
            <div className={styles.home_Container} onClick={handleOnClick}>
              <div className={styles.navigationContainer}>
                <BackButton
                  onclickHandle={() => handleCrumbNavigate(storeArray[storeArray.length - 2], storeArray.length - 2)}
                />

                <div className={styles.breadcrumb}>
                  <Box m={2}>
                    <Breadcrumbs separator={<NavigateNextIcon fontSize='small' />}>
                      {
                        storeArray.map((val: Record<string, string>, index: number) => {
                          return (
                            <Link key={index} underline='hover' onClick={() => {
                              if (index !== storeArray.length - 1) { handleCrumbNavigate(val, index) }
                            }
                            }>{val.name}</Link>
                          )
                        })
                      }
                    </Breadcrumbs>
                  </Box>
                </div>
                <div className={styles.sortSelect}>
                  <div className={styles.search}>
                    <DebounceInput
                      placeholder='Search..'
                      debounceTimeout={1000}
                      className={styles.searchBar}
                      onChange={(event: any) => setSearch(event.target.value)}
                      disabled={data[0]?.type === 'Table'}
                    />
                  </div>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120, paddingRight: "1rem" }}>
                    <InputLabel id="demo-simple-select-outlined-label" className={styles.select_label}>Sortby</InputLabel>
                    <Select
                      className={styles.sortbySelect}
                      value={sort}
                      placeholder="Sort"
                      onChange={(event: any) => handleSelectChange(event)}
                      disabled={data[0]?.type === 'Table'}
                    >
                      {
                        options.map((val: Record<string, string>, index: number) => {
                          return (
                            <MenuItem key={index} value={val.value}>{val.label}</MenuItem>
                          )
                        })
                      }
                    </Select>
                  </FormControl>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120, paddingRight: "1rem" }}>
                    <InputLabel id="demo-simple-select-outlined-label" className={styles.select_label}>Layout</InputLabel>
                    <Select
                      className={styles.sortbySelect}
                      value={layout}
                      placeholder="Layout"
                      onChange={(event: any) => setLayout(event.target.value)}
                      disabled={data[0]?.type === 'Table'}
                    >
                      {
                        folderSizeData.map((val: Record<string, string>, index: number) => {
                          return (
                            <MenuItem key={index} value={val.value}>{val.label}</MenuItem>
                          )
                        })
                      }
                    </Select>
                  </FormControl>
                </div>
              </div>
              {loading ? <Loading /> : 
                data[0]?.type !== 'Table' ?
                  <div className={styles.icons_container} onContextMenu={handleOnContextMenu} ref={contextContainerRef}>{
                    (data[0].data.length === 0) ? <NoData /> :
                    handleSearchChange(data[0]?.data).map((values: IDataObjectsProps, index: number) => {
                      return (
                        <Icons
                          key={index}
                          type={values.type}
                          name={values.name}
                          navigate={() => {
                            handlePageNavigate(values.type, values.id, values.name)
                          }}
                          ContextMenu={(event: any) => {
                            handleContextMenuIcon(event, values);
                          }}
                          size={layout}
                        />
                      );
                    })
                  }</div>
                  :
                  <MainPage />
              }

              {
                contextMenuData.isShow &&
                <div className={styles.menuList}>
                  <MenuList style={{ width: 200, maxWidth: '100%', top: contextMenuData.position.top, left: contextMenuData.position.left, border: '1px solid grey', boxShadow: "0 10px 20px rgb(0 0 0 / 0.2)", position: "absolute", boxSizing: "border-box", zIndex:3 }} ref={contextMenuRef}>
                    {
                      contextMenuData.isIcon ? <div>
                        <MenuItem
                          onClick={() => {
                            popupDispatch({
                              type: "setPopup",
                              payload: {
                                isPopupOpen: true,
                                actionType: "edit",
                                typeOfFile: contextMenuData.selectedData.type,
                                selectedData: contextMenuData.selectedData
                              }
                            })
                          }}
                        ><EditIcon sx={{ paddingRight: "1rem" }} />Rename</MenuItem>
                        <MenuItem
                          onClick={() => {
                            popupDispatch({
                              type: "setPopup", payload: {
                                isPopupOpen: true,
                                actionType: "delete",
                                typeOfFile: contextMenuData.selectedData.type,
                                selectedData: contextMenuData.selectedData
                              }
                            })
                          }}
                        ><DeleteIcon sx={{ paddingRight: "1rem" }} />Delete</MenuItem>

                        {storeArray[storeArray.length - 1].type !== "Excercise" &&
                          <MenuItem
                            onClick={() => handleExportChange()}
                          ><FileDownloadIcon sx={{ paddingRight: "1rem" }} />Export</MenuItem>
                        }

                      </div> : <div>

                        {
                          storeArray[storeArray.length - 1].type === "Global" && <>
                            <MenuItem
                              onClick={() => {
                                popupDispatch({
                                  type: "setPopup", payload: {
                                    isPopupOpen: true,
                                    actionType: "create",
                                    typeOfFile: "Project",
                                    selectedData: storeArray[storeArray.length - 1]
                                  }
                                })
                              }}
                            ><CreateNewFolderIcon sx={{ paddingRight: "1rem" }} />Create Project</MenuItem>
                            <MenuItem
                              onClick={() => {
                                popupDispatch({
                                  type: "setPopup", payload: {
                                    isPopupOpen: true,
                                    actionType: "create",
                                    typeOfFile: "Exercise",
                                    selectedData: storeArray[storeArray.length - 1]
                                  }
                                })
                              }}
                            ><NoteAddIcon sx={{ paddingRight: "1rem" }} />Create Excercise</MenuItem></>
                        }

                        {
                          storeArray[storeArray.length - 1].type === "Project" &&
                          <MenuItem
                            onClick={() => {
                              popupDispatch({
                                type: "setPopup", payload: {
                                  isPopupOpen: true,
                                  actionType: "create",
                                  typeOfFile: "Excercise",
                                  selectedData: storeArray[storeArray.length - 1]
                                }
                              })
                            }}
                          ><NoteAddIcon sx={{ paddingRight: "1rem" }} />Create Excercise</MenuItem>
                        }

                        {
                          storeArray[storeArray.length - 1].type === "Excercise" &&
                          <MenuItem
                            onClick={() => {
                              popupDispatch({
                                type: "setPopup", payload: {
                                  isPopupOpen: true,
                                  actionType: "create",
                                  typeOfFile: "Table",
                                  selectedData: storeArray[storeArray.length - 1]
                                }
                              })
                            }}
                          ><GridOnIcon sx={{ paddingRight: "1rem" }} />Create Table</MenuItem>
                        }
                      </div>
                    }
                  </MenuList>
                </div>
              }
            </div>
          </>
      )
      }
    </>
  )
};

export default Home;
