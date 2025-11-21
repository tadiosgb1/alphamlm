import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/opened/landing/Home.vue';
import Login from '../views/opened/auth/login.vue';
import ContactUs from '../views/opened/landing/contactUs.vue';
import Products from '../views/opened/landing/products.vue';
import About from '../views/opened/landing/about.vue';
import ResetPassword from '../views/opened/auth/ResetPassword.vue';
import ForgotPasssword from '../views/opened/auth/forgotPassword.vue';
import Registration from '../views/opened/auth/login.vue'; // note: same file as login
import Reset from '../views/opened/auth/reset.vue';
import AccessDenied from "../views/opened/auth/accessDenied.vue";

import first_dash from '../views/closed/first_dash.vue';
import dashboard from '../views/closed/dashboard.vue';
import Properties from '../views/closed/proporty/view.vue';
import PropertyDetail from '../views/closed/proporty/PropertyDetail.vue';
import PropertyPicture from '../views/closed/proportyPicture/view.vue';

import User_view from '../views/closed/users/view.vue';
import User_add from '../views/closed/users/add.vue';
import UserEdit from '../views/closed/users/edit.vue';
import UserDetail from '../views/closed/users/detail.vue';
import Permissions_add from '../views/closed/permissions/add.vue';
import permissions_view from '../views/closed/permissions/view.vue';
import view_groups from '../views/closed/groups/view.vue';
import staffs from '../views/closed/stafs/view.vue';
import Notifications from '../views/closed/notifications/view.vue';
import notificationDetail from '../views/closed/notifications/notificationDeatil.vue';
import Configurations from '../views/closed/Configurations/view.vue';

import GenealogyTree from '../views/closed/network/genealogytree.vue';
import Categories from '../views/closed/categories/view.vue';
import Products_dashboard from '../views/closed/products/view.vue';
import Trainings from '../views/closed/trainings/view.vue';
import Packages from '../views/closed/packages/view.vue';
import TrainingPackages from '../views/closed/TrainingPackages/view.vue';
import ProductPackages from '../views/closed/ProductPackages/view.vue';
import MlmSettings from '../views/closed/MlmSettings/view.vue';
import Commissions from '../views/closed/commissions/view.vue';
import CommissionConfiguration from '../views/closed/commissionConfiguration/view.vue';
import TreeSetting from '../views/closed/treeSetting/view.vue';
import Sales from '../views/closed/sales/view.vue';
import unilevelConfigurations from '../views/closed/unilevelConfigurations/view.vue';
import walletTransactions from '../views/closed/walletTransactions/view.vue';
import Settings from '../views/closed/settings/view.vue';
import Housings from '../views/closed/housing/view.vue';
import PromotorBuyer from '../views/closed/promotorBuyer/view.vue';
import Downlist  from '../views/closed/downlist/view.vue';
import Referallist  from '../views/closed/referalList/view.vue';
import withDrawRequest  from '../views/closed/payout/payoutRequest.vue';
import WithdrawStatement  from '../views/closed/payout/payoutStatements.vue';
import personalPv  from '../views/closed/pvHistory/personalPv.vue';
import groupPv  from '../views/closed/pvHistory/groupPv.vue';
import commissionReport  from '../views/closed/reports/commissionReport.vue';
import rankHistoryReport  from '../views/closed/reports/rankHistoryReport.vue';
import carryHistory  from '../views/closed/reports/carryHistory.vue';
import cycleHistory  from '../views/closed/reports/cycleHistory.vue';
import businessWallet  from '../views/closed/finance/bussnessWallet.vue';
import commissionWallet  from '../views/closed/finance/commissionWallet.vue';
import transactionHistory  from '../views/closed/finance/transactionHistory.vue';



const routes = [
  // Public routes
  { path: "/", name: "home", component: Home, meta: { requiresGuest: true } },
  { path: "/login", name: "login", component: Login, meta: { requiresGuest: true } },
  { path: "/register", name: "register", component: Registration, meta: { requiresGuest: true } },
  { path: "/contact-us", name: "contact-us", component: ContactUs, meta: { requiresGuest: true } },
  { path: "/about", name: "about", component: About, meta: { requiresGuest: true } },
  { path: "/products", name: "products", component: Products, meta: { requiresGuest: true } },
  { path: "/forgot-password", name: "ForgotPassword", component: ForgotPasssword, props: true },
  { path: "/:lang/reset-password", name: "ResetPassword", component: ResetPassword, props: true },
  { path: "/reset/:token", name: "reset", component: Reset, meta: { requiresGuest: true } },

  // Dashboard (protected area)
  {
    path: "/dashboard",
    name: "dashboard",
    component: dashboard,
    meta: { requiresGuest: true },
    children: [
      {
        path: "higheruser",
        name: "HigherUser-view",
        component: () => import('../views/closed/Higheruser/HigherUserView.vue'),
      },
      {
        path: "higheruser/add",
        name: "HigherUser-add",
        component: () => import('../views/closed/Higheruser/AddHigherUser.vue'),
      },
      {
        path: "higheruser/edit/:id",
        name: "HigherUser-edit",
        component: () => import('../views/closed/Higheruser/EditHigherUser.vue'),
        props: true,
      },
      {
        path: "higheruser/detail/:id",
        name: "HigherUser-detail",
        component: () => import('../views/closed/Higheruser/HigherUserDetail.vue'),
        props: true,
      },

      {
        path: "withdrawal_requestss",
        name: "Withdrawal_requests-view",
        component: () => import('../views/closed/Withdrawal_requestss/Withdrawal_requestsView.vue'),
      },
      {
        path: "withdrawal_requestss/add",
        name: "Withdrawal_requests-add",
        component: () => import('../views/closed/Withdrawal_requestss/AddWithdrawal_requests.vue'),
      },
      {
        path: "withdrawal_requestss/edit/:id",
        name: "Withdrawal_requests-edit",
        component: () => import('../views/closed/Withdrawal_requestss/EditWithdrawal_requests.vue'),
        props: true,
      },
      {
        path: "withdrawal_requestss/detail/:id",
        name: "Withdrawal_requests-detail",
        component: () => import('../views/closed/Withdrawal_requestss/Withdrawal_requestsDetail.vue'),
        props: true,
      },

      { path: "first-dash", name: "first-dash", component: first_dash },
      { path: "genealogy-tree", name: "genealogy-tree", component: GenealogyTree },

      { path: "properties", name: "properties", component: Properties },
      { path: "properties/:id", name: "PropertyDetail", component: PropertyDetail, props: true },
      { path: "pictures", name: "pictures", component: PropertyPicture },
      { path: "notifications", name: "notifications", component: Notifications },
      { path: "notification/:id", name: "notificationDetail", component: notificationDetail },
    
      { path: "user_view", name: "user_view", component: User_view },
      { path: "user_add", name: "user_add", component: User_add },
      { path: "user_edit/:id", name: "UserEdit", component: UserEdit, props: true },
      { path: "user_detail/:id", name: "UserDetail", component: UserDetail, props: true },
      { path: "permission_add", name: "permission_add", component: Permissions_add },
      { path: "permissions_view", name: "permissions_view", component: permissions_view },
      { path: "groups", name: "groups", component: view_groups },
      { path: "staffs", name: "staffs", component: staffs },


      { path: "configurations", name: "configurations", component: Configurations },
      { path: "categories", name: "categories", component: Categories },
      { path: "view_products", name: "view_products", component: Products_dashboard},
      { path: "trainings", name: "trainings", component: Trainings},
      { path: "packages", name: "packages", component: Packages},
      { path: "training_packages", name: "training_packages", component: TrainingPackages},
      { path: "product_packages", name: "product_packages", component: ProductPackages},
      { path: "mlm_settings", name: "mlm_settings", component: MlmSettings},
      { path: "commissions", name: "commissions", component: Commissions},
      { path: "commission_configurations", name: "commission_configurations", component: CommissionConfiguration},
      { path: "tree_settings", name: "tree_settings", component: TreeSetting},
      { path: "settings", name: "settings", component: Settings},
      { path: "sales", name: "sales", component: Sales},
      { path: "unilevel_configurations", name: "unilevel_configurations", component: unilevelConfigurations},
      { path: "wallet_transactions", name: "wallet_transactions", component: walletTransactions},
      { path: "housings", name: "housings", component: Housings},
      { path: "promotor_buyers", name: "promotor_buyers", component: PromotorBuyer},
      { path: "downlists", name: "downlists", component: Downlist},
      { path: "referallists", name: "referallists", component: Referallist},

     { path: "withdraw-requests", name: "withdraw-requests", component: withDrawRequest},
      { path: "withdraw-statements", name: "withdraw-statements", component: WithdrawStatement},
     { path: "personal-pv", name: "personal-pv", component: personalPv},
     { path: "group-pv", name: "group-pv", component: groupPv},

     { path: "commission-report", name: "commission-report", component: commissionReport},
     { path: "rank-history-report", name: "rank-history-report", component: rankHistoryReport},
     { path: "carry-history", name: "carry-history", component: carryHistory},
     { path: "cycle-history", name: "cycle-history", component: cycleHistory},

     { path: "business-wallet", name: "business-wallet", component: businessWallet},
     { path: "commission-wallet", name: "commission-wallet", component: commissionReport},
     { path: "transaction-history", name: "transaction-history", component: transactionHistory},

    ],
  },

  // Catch-all
  { path: "/:pathMatch(.*)*", name: "accessDenied", component: AccessDenied, meta: { requiresGuest: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest);
  const requiredRole = to.meta.role;

  if (requiresAuth) {
    if (!isAuthenticated) {
      next("/login");
    } else if (requiredRole && userRole !== requiredRole) {
      localStorage.clear();
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
