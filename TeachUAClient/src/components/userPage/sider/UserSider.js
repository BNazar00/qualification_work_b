import MenuSiderComponent from "./MenuSider";

const SiderComponent = ({url}) => {
    return (
        <div className="sider">
            <MenuSiderComponent url={url} />
        </div>
    );
};

export default SiderComponent;
