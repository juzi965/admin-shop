import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/base.css';
import {
  Button,
  Form,
  FormItem,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Slider,
  Progress,
  Message,
  MessageBox,
  Card,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Row,
  Col,
  Avatar,
  Menu,
  Submenu,
  Select,
  Option,
  MenuItem,
  MenuItemGroup,
  Popconfirm,
  Carousel,
  CarouselItem,
  Image,
  Divider,
  ButtonGroup,
  Badge,
  Rate,
  DatePicker,
  Dialog,
  Link,
  Table,
  TableColumn,
  Tag,
  Drawer,
  Tooltip,
  Pagination,
  Scrollbar
} from 'element-ui'

import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Checkbox)
Vue.use(CheckboxButton)
Vue.use(CheckboxGroup)
Vue.use(Slider)
Vue.use(Select)
Vue.use(Option)
Vue.use(Progress)
Vue.use(Card)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Row)
Vue.use(Col)
Vue.use(Container)
Vue.use(Avatar)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Popconfirm)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Image)
Vue.use(Divider)
Vue.use(ButtonGroup)
Vue.use(Badge)
Vue.use(Rate)
Vue.use(DatePicker)
Vue.use(Dialog)
Vue.use(Link)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tag)
Vue.use(Drawer)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Scrollbar)

Vue.component(CollapseTransition.name, CollapseTransition)



//挂载消息弹框属性
Vue.prototype.$message = Message

//挂载confirm属性
Vue.prototype.$confirm = MessageBox.confirm