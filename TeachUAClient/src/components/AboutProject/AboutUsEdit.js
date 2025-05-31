import React, {useEffect, useState} from "react";
import {getAllItems} from "../../service/AboutUsService";
import {Button, Form, Input, Layout, Tooltip} from "antd";
import Search from "../Search";
import "./css/aboutProject.css";
import AddItemComponent from "./item_popups/AddItemComponent";
import ItemView from "./ItemView";
import EditTitle from "./item_popups/EditTitle";
import EditText from "./item_popups/EditText";
import EditVideo from "./item_popups/EditVideo";
import EditPicture from "./item_popups/EditPicture";
import DeleteWarning from "./item_popups/DeleteItemWarning";
import ChangeItemOrder from "./item_popups/ChangeItemOrder";


const AboutUsEdit = () => {
    const [addItemVisible, setAddItemVisible] = useState(false);
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [titleVisible, setTitleVisible] = useState(false);
    const [textVisible, setTextVisible] = useState(false);
    const [videoVisible, setVideoVisible] = useState(false);
    const [pictureVisible, setPictureVisible] = useState(false);
    const [changeOrder, setChangeOrder] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [items, setItems] = useState([]);
    const getData = () => {
        getAllItems().then(response => {
            setItems(response);
        });
    }

    useEffect(() =>  {
        getData();
    },[]);

    const onClickEdit = (item) => {
        switch (item.type){
            case 1:
                setTitleVisible(true);
                break;
            case 2:
                setTextVisible(true);
                break;
            case 5:
                setVideoVisible(true);
                break;
            case 3:
            case 4:
                setPictureVisible(true);
                break;
        }
        assignItemToEdit(item);
    }

    const assignItemToEdit = (item) => {
        setEditItem(Object.assign({}, item));
    }



    return (
        <Layout className="aboutProject global-padding">
            <div className="lower-header-box about-header">
                <div className="city-name-box">
                    <h2 className="city-name">
                        Редагування сторінки "Про нас"
                    </h2>
                </div>
                <Search redirect/>
            </div>

            <div className="content-text">
                <span className="chapter">В тестові поля можна вставляти теги:</span>
                <br></br>
                    &lt;span className="chapter"&gt;ТекстТекстТекст&lt;/span&gt; - <span className="chapter">Підзаголовок</span>
                <br></br>
                    &lt;span className="highlight"&gt;ТекстТекстТекст&lt;/span&gt; - <span className="highlight">Виділений текст</span>
                <br></br>
                    &lt;p&gt;ТекстТекстТекст&lt;/p&gt; - Абзац
                <br></br>
                    &lt;br&gt;&lt;/br&gt; - Пустий рядок
                <br></br>
                    &lt;a&gt;&lt;/a&gt; - Посилання
            </div>

            {items.map(item => {
                return <div>
                    <hr></hr>
                    <div className="help-button">
                        <Button className="edit-button flooded-button donate-button" htmlType="submit"
                                onClick={() => {onClickEdit(item)}}>Редагувати</Button>
                        <Button className="edit-button flooded-button donate-button" htmlType="submit"
                                    onClick={() => {
                                    assignItemToEdit(item);
                                    setDeleteVisible(true);
                            }}>Видалити</Button>
                        <Button className="edit-button flooded-button donate-button" htmlType="submit"
                                onClick={() => {
                                    assignItemToEdit(item);
                                    setChangeOrder(true);
                            }}>Змінити порядок</Button>
                        <Button className="edit-button flooded-button donate-button" htmlType="submit"
                                onClick={() => {
                                    getData();
                                }}>Оновити</Button>
                    </div>
                    <ItemView item={item}/>
                </div>
            })}

            <div className="row">
            <div className="add-item-button">
                <Button className="flooded-button donate-button"
                        onClick={() => setAddItemVisible(true)}>
                    Додати компонент
                </Button>
            </div>
            <div className="add-item-button">
            <Button className="edit-button flooded-button donate-button" htmlType="submit"
                    onClick={() => {
                        getData();
                    }}>Оновити</Button>
            </div>
            </div>
            <AddItemComponent visible={addItemVisible} setVisible={setAddItemVisible}/>
            <DeleteWarning visible={deleteVisible} setVisible={setDeleteVisible} item={editItem}/>
            {editItem &&
            <div>
                <ChangeItemOrder visible={changeOrder} setVisible={setChangeOrder} id={editItem.id} size={items.length + 1}/>
                <EditTitle visible={titleVisible} setVisible={setTitleVisible} item={editItem}/>
                <EditText visible={textVisible} setVisible={setTextVisible} item={editItem}/>
                <EditVideo visible={videoVisible} setVisible={setVideoVisible} item={editItem}/>
                <EditPicture visible={pictureVisible} setVisible={setPictureVisible} item={editItem}/>
            </div>
            }
        </Layout>
    );

};

export default AboutUsEdit;