import {
  ChromeFilled,
  CrownFilled,
  SmileFilled,
  TabletFilled,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const defaultProps = {
  route: {
    path: "/",
    routes: [
      {
        path: "/welcome",
        name: "欢迎",
        icon: <SmileFilled />,
        component: "./Welcome",
      },
      {
        name: "列表页",
        icon: <TabletFilled />,
        path: "/list",
        routes: [
          {
            path: "/easy-table",
            name: "简单列表",
            icon: <CrownFilled />,
            component: "./Welcome",
          },
          {
            path: "/list/sub-page2",
            name: "二级列表页面",
            icon: <CrownFilled />,
            component: "./Welcome",
          },
          {
            path: "/list/sub-page3",
            name: "三级列表页面",
            icon: <CrownFilled />,
            component: "./Welcome",
          },
        ],
      },
      {
        path: "https://ant.design",
        name: "Ant Design 官网外链",
        icon: <ChromeFilled />,
      },
    ],
  },
  location: {
    pathname: "/",
  },
};

const MenuItem = ({ path, name, icon }) => {
  const router = useRouter();

  const handleClick = () => {
    if (path.startsWith("http")) {
      window.open(path, "_blank");
    } else {
      router.push(path);
    }
  };

  return (
    <div onClick={handleClick}>
      {icon}
      {name}
    </div>
  );
};

export default defaultProps;
