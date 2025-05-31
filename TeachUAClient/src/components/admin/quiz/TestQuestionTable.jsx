import React, {useEffect, useState} from "react";

import { searchQuestions, getQuestionTypes, getQuestionCategories, deleteQuestion } from "../../../service/TestQuestionService";
import './css/TestQuestionTable.css';
import { Table, Typography, Input, Button, Popconfirm, message } from "antd";
import { Link } from "react-router-dom";

const {Title} = Typography;

const { Search } = Input;

export const TestQuestionTable = () => {

    const tableProperties = {
      pagination: {
        current: 1,
        pageSize: 10
      },
      filters: {
      }
    }

    const [questions, setQuestions] = useState([]);
    const [types, setTypes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [properties, setProperties] = useState(tableProperties);

    const fetchData = () => {
      setLoading(true);
      const order = properties.order === 'ascend' ? 'asc' : 'desc';
      const sortField = properties.field ? properties.field : 'id';
      const type = properties.filters.questionTypeTitle ? properties.filters.questionTypeTitle[0] : '';
      const category = properties.filters.questionCategoryTitle ? properties.filters.questionCategoryTitle[0] : '';
      searchQuestions(
        properties.pagination.current, 
        properties.pagination.pageSize,
        sortField,
        order,
        searchQuery,
        type,
        category
      ).then(response => {
        handleResponse(response)
      });
    }

    const handleResponse = (response) => {
      setQuestions(response.data.content);
      setLoading(false);
      setProperties({
        ...properties,
        pagination: {
          ...properties.pagination,
          total: response.data.totalElements
        }
      })
    }

    const fetchTypes = () => {
      setLoading(true);
      getQuestionTypes().then(response => {
        setTypes(response.data.map(type => ({text: type.title, value: type.title})));
        setLoading(false);
      });
    }

    const fetchCategories = () => {
      setLoading(true);
      getQuestionCategories().then(response => {
        setCategories(response.data.map(type => ({text: type.title, value: type.title})));
        setLoading(false);
      });
    }

    const handleTableChange = (pagination, filters, sorter) => {
      setProperties({
        pagination,
        filters,
        ...sorter,
      })
    }

    const resetProperties = () => {
      setProperties(tableProperties);
    }

    const handleSearch = (query) => {
      resetProperties();
      setSearchQuery(query);
    }

    const deleteQuestionById = (id) => {
      deleteQuestion(id).then(response => {
        message.success('Питання видалено');
        fetchData();
      }).catch(function (error) {
        message.error(error.response.data.message);
      });
    }

    useEffect(() => {
        fetchData();
        fetchTypes();
        fetchCategories();
    }, []);

    useEffect(() => {
      fetchData();
    }, [JSON.stringify(properties), searchQuery]);
      
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        sorter: true
      },
      {
        title: 'Заголовок',
        dataIndex: 'title',
        key: 'title',
        sorter: true
      },
      {
        title: 'Опис',
        dataIndex: 'description',
        key: 'description',
        sorter: true
      },
      {
        title: 'Тип',
        dataIndex: 'questionTypeTitle',
        key: 'questionTypeTitle',
        sorter: true,
        filters: types,
        filterMultiple: false
      },
      {
        title: 'Категорія',
        dataIndex: 'questionCategoryTitle',
        key: 'questionCategoryTitle',
        sorter: true,
        filters: categories,
        filterMultiple: false
      },
      {
        title: 'Управління',
        key: 'action',
        render: (_, record) => (
          <>
            <Link
                to={"/admin/quiz/questions/" + record.id}
                className="back-btn"
            >
                <Button>
                  Редагувати
                </Button>
            </Link>
            <Popconfirm 
                title="Видалити питання?" 
                onConfirm={() => deleteQuestionById(record.id)}
                cancelText="Ні"
                okText="Так"
                okButtonProps={<Button />}
            >
                <Button danger={true}>Видалити</Button>
            </Popconfirm>
          </>
        )
      }
    ];
      
    return (
      <div className="questionsContent">
        <Title level={3}>Питання</Title>
        <div className="search-and-add-questions">
          <Search
              placeholder="Введіть заголовок питання"
              onSearch={ handleSearch }
              allowClear
              style={{
                  width: 250,
              }}
          />
          <Link
                to="/admin/quiz/questions/new"
                className="back-btn"
            >
              <Button className="flooded-button add-btn">
                Додати питання
              </Button>
            </Link>
        </div>
        <Table
          rowKey={(record) => record.id}
          dataSource={questions}
          columns={columns}
          pagination={properties.pagination}
          loading={loading}
          onChange={handleTableChange}
          tableLayout="fixed"
        />
      </div>
    );

}
