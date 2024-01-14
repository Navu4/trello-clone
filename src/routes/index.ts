import { ROUTES } from "../utils/app.constants";
import loadable from "../utils/loadable";

const Login = loadable(() => import("../pages/login"));
const SignUp = loadable(() => import("../pages/signup"));
const Dashboard = loadable(() => import("../pages/dashboard"));
const Home = loadable(() => import("../pages/home"));
const CreateFirstDashboard = loadable(
  () => import("../pages/createFirstDashboard")
);
const Board = loadable(() => import("../pages/board"));

export default [
  {
    name: "Login",
    path: ROUTES.LOGIN,
    component: Login,
    isProtected: false,
  },
  {
    name: "Sign Up",
    path: ROUTES.SIGN_UP,
    component: SignUp,
    isProtected: false,
  },
  {
    name: "Dashboard",
    path: ROUTES.DASHBOARD,
    component: Dashboard,
    isProtected: true,
  },
  {
    name: "Home",
    path: ROUTES.BASE_PATH,
    component: Home,
    isProtected: true,
  },
  {
    name: "Create First Dashboard",
    path: ROUTES.CREATE_FIRST_DASHBOARD,
    component: CreateFirstDashboard,
    isProtected: true,
  },
  {
    name: "First Dashboard Info",
    path: ROUTES.FIRST_DASHBOARD_INFO,
    component: CreateFirstDashboard,
    isProtected: true,
  },
  {
    name: "Board",
    path: `${ROUTES.BOARD}/:boardId`,
    component: Board,
    isProtected: true,
  },
];
