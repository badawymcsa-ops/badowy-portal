export const DEFAULT_LOCALE = "ar";

export const SUPPORTED_LOCALES: readonly string[] = ["ar", "en"];

export const LOCALE_DIRECTIONS: Record<string, "rtl" | "ltr"> = {
  ar: "rtl",
  en: "ltr"
};

export const routes = {
  public: {
    home: (locale = DEFAULT_LOCALE) => `/${locale}`,
    login: (locale = DEFAULT_LOCALE) => `/${locale}/login`,
    register: (locale = DEFAULT_LOCALE) => `/${locale}/register`
  },
  client: {
    dashboard: (locale = DEFAULT_LOCALE) => `/${locale}/dashboard`,
    onboarding: (locale = DEFAULT_LOCALE) => `/${locale}/onboarding`,
    brand: (locale = DEFAULT_LOCALE) => `/${locale}/brand`,
    products: (locale = DEFAULT_LOCALE) => `/${locale}/products`,
    productNew: (locale = DEFAULT_LOCALE) => `/${locale}/products/new`,
    productEdit: (productId: string, locale = DEFAULT_LOCALE) => `/${locale}/products/${productId}/edit`,
    services: (locale = DEFAULT_LOCALE) => `/${locale}/services`,
    serviceNew: (locale = DEFAULT_LOCALE) => `/${locale}/services/new`,
    serviceEdit: (serviceId: string, locale = DEFAULT_LOCALE) => `/${locale}/services/${serviceId}/edit`,
    requests: (locale = DEFAULT_LOCALE) => `/${locale}/requests`,
    requestNew: (locale = DEFAULT_LOCALE) => `/${locale}/requests/new`,
    requestDetail: (requestId: string, locale = DEFAULT_LOCALE) => `/${locale}/requests/${requestId}`,
    deliverables: (locale = DEFAULT_LOCALE) => `/${locale}/deliverables`,
    deliverableDetail: (deliverableId: string, locale = DEFAULT_LOCALE) => `/${locale}/deliverables/${deliverableId}`
  },
  admin: {
    dashboard: (locale = DEFAULT_LOCALE) => `/${locale}/admin`,
    clients: (locale = DEFAULT_LOCALE) => `/${locale}/admin/clients`,
    clientDetail: (clientId: string, locale = DEFAULT_LOCALE) => `/${locale}/admin/clients/${clientId}`,
    requests: (locale = DEFAULT_LOCALE) => `/${locale}/admin/requests`,
    requestDetail: (requestId: string, locale = DEFAULT_LOCALE) => `/${locale}/admin/requests/${requestId}`,
    team: (locale = DEFAULT_LOCALE) => `/${locale}/admin/team`
  }
} as const;

export type RedirectUser = {
  role?: string | null;
  onboardingStatus?: string | null;
};

export function getLoginPath(locale = DEFAULT_LOCALE) {
  return routes.public.login(locale);
}

export function getRegisterPath(locale = DEFAULT_LOCALE) {
  return routes.public.register(locale);
}

export function getDashboardPath(locale = DEFAULT_LOCALE) {
  return routes.client.dashboard(locale);
}

export function getOnboardingPath(locale = DEFAULT_LOCALE) {
  return routes.client.onboarding(locale);
}

export function getBrandPath(locale = DEFAULT_LOCALE) {
  return routes.client.brand(locale);
}

export function getProductsPath(locale = DEFAULT_LOCALE) {
  return routes.client.products(locale);
}

export function getProductNewPath(locale = DEFAULT_LOCALE) {
  return routes.client.productNew(locale);
}

export function getProductEditPath(productId: string, locale = DEFAULT_LOCALE) {
  return routes.client.productEdit(productId, locale);
}

export function getServicesPath(locale = DEFAULT_LOCALE) {
  return routes.client.services(locale);
}

export function getServiceNewPath(locale = DEFAULT_LOCALE) {
  return routes.client.serviceNew(locale);
}

export function getServiceEditPath(serviceId: string, locale = DEFAULT_LOCALE) {
  return routes.client.serviceEdit(serviceId, locale);
}

export function getRequestsPath(locale = DEFAULT_LOCALE) {
  return routes.client.requests(locale);
}

export function getRequestNewPath(locale = DEFAULT_LOCALE) {
  return routes.client.requestNew(locale);
}

export function getRequestDetailPath(requestId: string, locale = DEFAULT_LOCALE) {
  return routes.client.requestDetail(requestId, locale);
}

export function getDeliverablesPath(locale = DEFAULT_LOCALE) {
  return routes.client.deliverables(locale);
}

export function getDeliverableDetailPath(deliverableId: string, locale = DEFAULT_LOCALE) {
  return routes.client.deliverableDetail(deliverableId, locale);
}

export function getAdminPath(locale = DEFAULT_LOCALE) {
  return routes.admin.dashboard(locale);
}

export function getAdminClientsPath(locale = DEFAULT_LOCALE) {
  return routes.admin.clients(locale);
}

export function getAdminClientDetailPath(clientId: string, locale = DEFAULT_LOCALE) {
  return routes.admin.clientDetail(clientId, locale);
}

export function getAdminRequestsPath(locale = DEFAULT_LOCALE) {
  return routes.admin.requests(locale);
}

export function getAdminRequestDetailPath(requestId: string, locale = DEFAULT_LOCALE) {
  return routes.admin.requestDetail(requestId, locale);
}

export function getAdminTeamPath(locale = DEFAULT_LOCALE) {
  return routes.admin.team(locale);
}

export function getPostLoginRedirectPath(user: RedirectUser, locale = DEFAULT_LOCALE) {
  if (
    user.role === "SUPER_ADMIN" ||
    user.role === "PROJECT_MANAGER" ||
    user.role === "DESIGNER" ||
    user.role === "MARKETER" ||
    user.role === "DEVELOPER" ||
    user.role === "VIEWER"
  ) {
    return getAdminPath(locale);
  }

  if (user.onboardingStatus === "COMPLETED") {
    return getDashboardPath(locale);
  }

  return getOnboardingPath(locale);
}
