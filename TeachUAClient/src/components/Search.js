import {AutoComplete, Select} from "antd";
import React from "react";
import {withRouter} from "react-router-dom";
import {
    clearSearchParameters,
    mapSearchParameters,
    SearchContext,
    searchInputData,
    searchParameters,
} from "../context/SearchContext";

import {getClubsByAdvancedSearch, getClubsByParameters} from "../service/ClubService";
import {getPossibleResults, getPossibleResultsByText, getResultSearchReport,} from "../service/SearchService";
import ControlOutlined from "@ant-design/icons/lib/icons/ControlOutlined";
import SearchOutlined from "@ant-design/icons/lib/icons/SearchOutlined";
import {getAllCategories} from "../service/CategoryService";
import {FilePdfOutlined} from "@ant-design/icons";
import {getUserId} from "../service/StorageService";
import {getUserById} from "../service/UserService";


const {Option, OptGroup} = Select;

class Search extends React.Component {
    static contextType = SearchContext;

    constructor(props) {
        super(props);
        this.timer = null;

        this.state = {
            possibleResults: {
                categories: [],
                clubs: [],
            },
            allCategories: [],
            loading: false,
            searchClicked: false,
            user:''
        };
    }

    componentWillUnmount() {
        if (this.props.location.pathname !== '/') {
            clearSearchParameters();
            searchInputData.input = "";
        }
    }

    componentDidMount() {
        getAllCategories().then((response) => {
            this.setState({allCategories: response});
        });
        this.setState({loading: true});
        getPossibleResults(searchParameters).then((response) => {
            this.setState({possibleResults: response, loading: false});
        });
        if(getUserId()) {
            getUserById(getUserId()).then(response => {
                this.setState({user:response});
            })
        }
    }

    onSearchChange = (value, option, page) => {
        clearTimeout(this.timer);

        if (value === undefined) {
            return;
        }
        if (value.trim().length === 0) {
            return;
        }
        if (this.props.redirect && value.length > 2) {
            this.timer = setTimeout(() => {
                this.props.history.push("/clubs", {value});
            }, 1000);
        }

        if (!searchParameters.isAdvancedSearch) {
            clearSearchParameters();

            switch (option.type) {
                case "category":
                    searchParameters.categoryName = value;
                    mapSearchParameters.categoryName = value;
                    break;
                case "club":
                    searchParameters.clubName = value;
                    break;
                default: {
                    if (this.state.allCategories.find((category) =>
                            category.name
                                .toLowerCase()
                                .includes(value.toLowerCase()))) {
                        searchParameters.categoryName = value;
                    } else {
                        searchParameters.clubName = value;
                    }
                }
            }
            getClubsByParameters(searchParameters).then((response) => {
                this.context.setClubs(response);
            });
        } else {
            switch (option.type) {
                case "category":
                    searchParameters.categoryName = value;
                    mapSearchParameters.categoryName = value;
                    break;
                case "club":
                    searchParameters.clubName = value;
                    break;
                default: {
                    if (this.state.allCategories.find((category) =>
                        category.name.toLowerCase()
                            .includes(value.toLowerCase()))) {
                        searchParameters.categoryName = value;
                    }
                }
            }
            const DEFAULT_SORT_BY = "name";
            const DEFAULT_SORT_DIRECTION = "asc";
            let checkUndefPage = page === undefined ? 0 : page;
            getClubsByAdvancedSearch(searchInputData.input, checkUndefPage, DEFAULT_SORT_BY, DEFAULT_SORT_DIRECTION).then((response) => {
                this.context.setClubs(response);
            })
        }
    };

    onSearch = (value) => {
        searchInputData.input = value;
        value = value.trim();
        clearTimeout(this.timer);

        this.timer = setTimeout(() => {
            this.onSearchChange(value, "all");
            this.setState({loading: true});
            getPossibleResultsByText(value, searchParameters).then((response) => {
                this.setState({possibleResults: response, loading: false});
            });
        }, 1000);
    };

    onSelect = (value, option) => {
        searchInputData.input = value;
        this.onSearchChange(value, option);
    };

    onClear = () => {
        if (!this.props.advancedSearch) {
            clearSearchParameters();
            searchInputData.input = "";
            getClubsByParameters(searchParameters).then((response) => {
                this.context.setClubs(response);
            });
        }
    };

    onKeyDown = (event) => {
        if (event.key === "Enter") {
            // this.props.history.push("/clubs", event.target.input);
            // event.target.defaultValue &&
            // this.onSearchChange(event.target.defaultValue, {type: "all"});
            this.setState({loading: true});
            this.onSearchChange(event.target.input, {type: "all"});
            this.setState({loading: false});
        }
    };

    searchOnClick = () => {
        this.state.searchClicked = true;
        if (this.state.searchClicked) {
            this.setState({loading: true});

            this.onSearchChange(searchInputData.input, {type: "all"});
            this.setState({loading: false});
        }
        this.state.searchClicked = false;
        // this.props.setShowHideMenu(true);
    };

    handleAdvancedSearch = () => {
        if (this.props.redirect) {
            //redirect with props value for component
            this.props.history.push({
                pathname: "/clubs",
                state: {showAdvancedSearch: true},
            });
            searchParameters.isAdvancedSearch = true;
        } else {
            if (this.props.advancedSearch) {
                this.props.setAdvancedSearch(false);
                searchParameters.isAdvancedSearch = false;
            } else {
                this.props.setAdvancedSearch(true);
                this.props.setShowHideMenu(true);
                searchParameters.isAdvancedSearch = true;
            }
        }
    };

    render() {
        return (
            <div className="search">
                <AutoComplete
                    allowClear={true}
                    loading={this.state.loading}
                    //disabled={searchParameters.isAdvancedSearch}
                    onSelect={this.onSelect}
                    onSearch={this.onSearch}
                    onInputKeyDown={this.onKeyDown}
                    onClear={this.onClear}
                    onBlur={this.onKeyDown}
                    style={{
                        width: 230,
                        //    opacity: searchParameters.isAdvancedSearch ? 0.5 : 1,
                    }}
                    placeholder="Який гурток шукаєте?"
                    maxLength={50}>
                    <OptGroup label="Категорії">
                        {this.state.possibleResults.categories.map((result) => (
                            <Option
                                value={result.name}
                                type={"category"}
                                key={"category" + "#" + result.id}>
                                {result.name}
                            </Option>
                        ))}
                    </OptGroup>
                    <OptGroup label="Гуртки">
                        {this.state.possibleResults.clubs.map((result) => (
                            <Option
                                value={result.name.trim()}
                                type={"club"}
                                key={"club" + "#" + result.id}>
                                {result.name.trim()}
                            </Option>
                        ))}
                    </OptGroup>
                </AutoComplete>


                <div className="search-icon-group">
                    <SearchOutlined
                        className="advanced-icon"
                        style={{
                            borderRadius: 0,
                            backgroundColor: "transparent",
                            color: "white",
                            //opacity: searchParameters.isAdvancedSearch
                            //    ? 0.5
                            //    : 1,
                            marginLeft: 0,
                            marginRight: 12,
                        }}
                        onClick={this.searchOnClick}
                    />
                    <ControlOutlined className="advanced-icon" title={"Розширений пошук"}
                                     style={{color: "orange", backgroundColor: "white"}}
                                     onClick={this.handleAdvancedSearch}
                    />

                </div>
                {this.state.user !== null && this.state.user !== undefined && this.state.user !== '' && this.state.user.roleName === "ROLE_ADMIN" ?
                <div className="search-icon-group">
                    <FilePdfOutlined className="advanced-icon" title={"Завантажити результат пошуку"}
                                     style={{color: "orange", backgroundColor: "white"}}
                                     onClick={() => getResultSearchReport(searchParameters, "Result for " + searchParameters.clubName)}>
                    </FilePdfOutlined>
                </div>:""}
            </div>
        );
    }
}

export default withRouter(Search);