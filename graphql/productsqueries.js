import { gql } from "@apollo/client";

const GET_ALL_FILTER_PRODUCT = gql`
  query (
    $groupByProduct: Boolean
    $facetArray: [ID!]
    $facetValueOperator: LogicalOperator
    $facetValueFilters: [FacetValueFilterInput!]
  ) {
    search(
      input: {
        groupByProduct: $groupByProduct
        facetValueIds: $facetArray
        facetValueOperator: $facetValueOperator
        facetValueFilters: $facetValueFilters
        take:29
      }
    ) {
      totalItems
      facetValues {
        count
        facetValue {
          id
          name
          code
          facet {
            id
            name
          }
        }
      }
      items {
        productId
        productName
        slug
        sku
        productAsset {
          id
          preview
        }
      }
    }
  }
`;

const GET_FILTER_CUSTOM_FIELD = gql`
  query {
    products(options: {}) {
      items {
        id
        slug
        name
        description
        src: assets {
          source
        }
        hoverState: assets {
          preview
          height: height
          width
        }
        variants {
          id
          price: price
          stockLevel
          sku
          createdAt
        }
        customFields {
          customiser_code
        }
      }
    }
  }
`;

const GET_FEATURED_PRODUCTS_IDS=gql`
query($facetValueIds: [ID!]) {
  search(input: { groupByProduct: true, facetValueIds: $facetValueIds }) {
    totalItems
    items {
      productId
    }
  }
}
`;
const GET_FEATURED_PRODUCT=gql`
query products($productIds: [String!]) {
  products(options: { filter: { id: { in: $productIds } } }) {
    totalItems
    items {
      id
        name
        customFields {
          customiser_code
        }
        src: assets {
          source
        }
        hoverState: assets {
          preview
          height: height
          width
        }
        description
        variants {
          id
          price: price
          stockLevel
          sku
          createdAt
        }
        facetValues {
          category: name
        }
        slug
    }
  }
}
`;
const GET_PRODUCT_TOTAL=gql`
query{
products {
  totalItems
}
}`;
const GET_RELATED_PRODUCTS = gql`
  query ($slug: String!, $count: Int!,$skip:Int!) {
    products(options: { take: $count, skip:$skip, filter: { slug: { notEq: $slug } } }) {
      totalItems
      items {
        slug
        name
        customFields {
          customiser_code
        }
        variants {
          name
          sku
          price
        }
      }
    }
  }
`;

const GET_ALL_PRODUCTS = gql`
  # Write your query or mutation here
  {
    products {
      totalItems
      items {
        id
        name
        customFields {
          customiser_code
        }
        src: assets {
          source
        }
        hoverState: assets {
          preview
          height: height
          width
        }
        description
        variants {
          id
          price: price
          stockLevel
          sku
          createdAt
        }
        facetValues {
          category: name
        }
        slug
      }
    }
  }
`;

const UPDATE_CUSTOMER_ADDRESS = gql`
  mutation updateCustomerAddress($input: UpdateAddressInput!) {
    updateCustomerAddress(input: $input) {
      id
      createdAt
      updatedAt
      fullName
      company
      streetLine1
      streetLine2
      city
      province
      postalCode
      country {
        code
        name
      }
      phoneNumber
      defaultBillingAddress
      defaultShippingAddress
    }
  }
`;

const DELETE_CUSTOMER_ADDRESS = gql`
  mutation deleteCustomerAddress($id: ID!) {
    deleteCustomerAddress(id: $id) {
      success
    }
  }
`;

const CREATE_GUEST_CUSTOMER = gql`
  mutation etCustomerForOrder($input: CreateCustomerInput!) {
    setCustomerForOrder(input: $input) {
      __typename
    }
  }
`;

const  IS_ACTIVE_ORDER=gql`
{
  activeOrder{
    __typename
    state
  }
}`

const CREATE_CUSTOMER_ADDRESS = gql`
  mutation createCustomerAddress($input: CreateAddressInput!) {
    createCustomerAddress(input: $input) {
      id
      createdAt
      updatedAt
      fullName
      company
      streetLine1
      streetLine2
      city
      province
      postalCode
      country {
        code
        name
      }
      phoneNumber
      defaultBillingAddress
      defaultShippingAddress
    }
  }
`;

//Single Product Fetching

const GET_SINGLE_PRODUCT = gql`
  # Write your query or mutation here
  query ($slug: String!) {
    product(slug: $slug) {
      id
      name
      customFields {
        customiser_code
        ProductDetails
        MaterialsAndCare
        ShippingAndReturn
      }
      src: assets {
        source
      }
      hoverState: assets {
        preview
        height: height
        width
      }
      description
      variants {
        id
        price: price
        stockLevel
        sku
        createdAt
        name
        options {
          id
          name
          code
        }
      }
      facetValues {
        category: name
      }
      slug
    }
  }
`;

const GET_HOME_PRODUCTS = gql`
  # Write your query or mutation here
  {
    products {
      items {
        id
        name
        src: assets {
          source
        }
        hoverState: assets {
          preview
          height: height
          width
        }
        variants {
          price: price
          stockLevel
          sku
        }
        description
        facetValues {
          category: name
        }
        slug
      }
    }
  }
`;

// const REGISTER_USER = gql`
//   mutation newMutation(
//     $email: String!
//     $password: String!
//     $username: String!
//   ) {
//     registerCustomerAccount(
//       input: {
//         emailAddress: $email
//         title: ""
//         firstName: $username
//         lastName: ""
//         phoneNumber: ""
//         password: $password
//       }
//     ) {
//       __typename
//     }
//   }
// `;

const REGISTER_USER = gql`
  mutation registerCustomerAccount($input: RegisterCustomerInput!) {
    registerCustomerAccount(input: $input) {
      __typename
    }
  }
`;

const Login_User = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      __typename
    }
  }
`;

const CURRENT_USER_DATA = gql`
  {
    activeCustomer {
      id
      firstName
      emailAddress
      customFields {
        wishlist
      }
      phoneNumber
      addresses {
        id
        fullName
        company
        streetLine1
        streetLine2
        city
        province
        postalCode
        country {
          name
          code
        }
        customFields
        phoneNumber
        defaultShippingAddress
        defaultBillingAddress
      }
    }
  }
`;

const GET_ACTIVE_WISHLIST = gql`
  query {
    activeCustomer {
      customFields {
        wishlist
      }
    }
  }
`;

const GET_PRODUCT_WISHLIST = gql`
  query ($option: [String!]) {
    products(options: { filter: { slug: { in: $option } } }) {
      totalItems
      items {
        slug
        name
        customFields {
          customiser_code
        }
        variants {
          name
          sku
          price
        }
      }
    }
  }
`;

const CREATE_WISHLIST = gql`
  mutation ($whislist: [String!]) {
    updateCustomer(input: { customFields: { wishlist: $whislist } }) {
      __typename
    }
  }
`;

const CURRENT_USER_ORDER_DATA = gql`
  {
    activeCustomer {
      orders(
        options: {
          sort: { createdAt: DESC }
          filter: { state: { notIn: ["Draft", "Created", "AddingItems"] } }
        }
      ) {
        items {
          id
          state
          createdAt
          orderPlacedAt
          active
          customer {
            emailAddress
          }
          shippingWithTax
          subTotalWithTax
          total
          totalWithTax
          couponCodes
          discounts {
            amount
            amountWithTax
            adjustmentSource
            type
            description
          }
          lines {
            id
            customFields {
              customOptions
            }
            productVariant {
              id
              name
              product {
                name
              }
              stockLevel
              sku
              createdAt
              assets {
                source
              }
              options {
                id
                name
                code
              }
              customFields
              product {
                id
                slug
                assets {
                  source
                  preview
                  height
                  width
                }
              }
              price
              priceWithTax
            }
            quantity
            linePriceWithTax
          }

          payments {
            id
            method
            amount
            state
            transactionId
            errorMessage
          }
          totalQuantity
          currencyCode
          total
        }
      }
    }
  }
`;

// const CURRENT_USER_DATA = gql`
//   {
//     activeCustomer {
//       id
//       createdAt
//       updatedAt
//       title
//       firstName
//       lastName
//       phoneNumber
//       emailAddress
//       addresses {
//         id
//         createdAt
//         updatedAt
//         fullName
//         company
//         streetLine1
//         streetLine2
//         city
//         province
//         postalCode
//         country {
//           name
//         }
//         phoneNumber
//         defaultShippingAddress
//         defaultBillingAddress
//       }
//       orders {
//         items {
//           id
//           createdAt
//           updatedAt
//           orderPlacedAt
//           code
//           state
//           active
//           customer {
//             firstName
//           }
//           shippingAddress {
//             streetLine1
//             city
//           }
//           billingAddress {
//             streetLine1
//             city
//           }
//           lines {
//             id
//             createdAt
//             updatedAt
//             productVariant {
//               name
//               price
//             }
//             featuredAsset {
//               name
//             }
//             unitPrice
//             unitPriceWithTax
//             unitPriceChangeSinceAdded
//             unitPriceWithTaxChangeSinceAdded
//             discountedUnitPrice
//             discountedUnitPriceWithTax
//             proratedUnitPrice
//             proratedUnitPriceWithTax
//             quantity
//             items {
//               id
//               createdAt
//               updatedAt
//               cancelled
//               unitPrice
//               unitPriceWithTax
//               discountedUnitPrice
//               discountedUnitPriceWithTax
//               proratedUnitPrice
//               proratedUnitPriceWithTax
//               unitTax
//               taxRate
//               adjustments {
//                 adjustmentSource
//                 type
//                 description
//                 amount
//               }
//               taxLines {
//                 description
//                 taxRate
//               }
//               fulfillment {
//                 id
//                 createdAt
//                 updatedAt
//                 orderItems {
//                   id
//                   createdAt
//                   updatedAt
//                   cancelled
//                   unitPrice
//                   unitPriceWithTax
//                   discountedUnitPrice
//                   discountedUnitPriceWithTax
//                   proratedUnitPrice
//                   proratedUnitPriceWithTax
//                   unitTax
//                   taxRate
//                   adjustments {
//                     adjustmentSource
//                     type
//                     description
//                     amount
//                   }
//                   taxLines {
//                     description
//                     taxRate
//                   }
//                   fulfillment {
//                     id
//                     createdAt
//                     updatedAt
//                     orderItems {
//                       id
//                       createdAt
//                       updatedAt
//                       cancelled
//                       unitPrice
//                       unitPriceWithTax
//                       discountedUnitPrice
//                       discountedUnitPriceWithTax
//                       proratedUnitPrice
//                       proratedUnitPriceWithTax
//                       unitTax
//                       taxRate
//                       adjustments {
//                         adjustmentSource
//                         type
//                         description
//                         amount
//                       }
//                       taxLines {
//                         description
//                         taxRate
//                       }

//                       refundId
//                     }
//                     state
//                     method
//                     trackingCode
//                     customFields
//                   }
//                   refundId
//                 }
//                 state
//                 method
//                 trackingCode
//                 customFields
//               }
//               refundId
//             }
//             taxRate
//             linePrice
//             linePriceWithTax
//             discountedLinePrice
//             discountedLinePriceWithTax
//             proratedLinePrice
//             proratedLinePriceWithTax
//             lineTax
//             discounts {
//               adjustmentSource
//               type
//               description
//               amount
//               amountWithTax
//             }
//             taxLines {
//               description
//               taxRate
//             }
//             order {
//               state
//               totalQuantity
//             }
//           }
//           surcharges {
//             id
//             createdAt
//             updatedAt
//             description
//             sku
//             taxLines {
//               description
//               taxRate
//             }
//             price
//             priceWithTax
//             taxRate
//           }
//           discounts {
//             adjustmentSource
//             type
//             description
//             amount
//             amountWithTax
//           }
//           couponCodes
//           promotions {
//             id
//             createdAt
//             updatedAt
//             startsAt
//             endsAt
//             couponCode
//             perCustomerUsageLimit
//             name
//             enabled
//             conditions {
//               code
//               args {
//                 name
//                 value
//               }
//             }
//           }
//         }
//         payments {
//           id
//           updatedAt
//           method
//           amount
//           state
//           transactionId
//           errorMessage
//           refunds {
//             id
//             updatedAt
//             items
//             shipping
//             adjustment
//             total
//             method
//             state
//             transactionId
//             reason
//             orderItems {
//               id
//               updatedAt
//               cancelled
//               unitPrice
//               unitPriceWithTax
//               discountedUnitPrice
//               discountedUnitPriceWithTax
//               proratedUnitPrice
//               proratedUnitPriceWithTax
//               unitTax
//               taxRate
//               adjustments {
//                 adjustmentSource
//                 type
//                 description
//                 amount
//               }
//               taxLines {
//                 description
//                 taxRate
//               }

//               refundId
//             }
//             paymentId
//           }
//           metadata
//         }
//         fulfillments {
//           id: createdAt
//           updatedAt
//           orderItems {
//             id: createdAt
//             updatedAt
//             cancelled
//             unitPrice
//             unitPriceWithTax
//             discountedUnitPrice
//             discountedUnitPriceWithTax
//             proratedUnitPrice
//             proratedUnitPriceWithTax
//             unitTax
//             taxRate
//             adjustments {
//               adjustmentSource
//               type
//               description
//               amount
//             }
//             taxLines {
//               description
//               taxRate
//             }

//             refundId
//           }
//           state
//           method
//           trackingCode
//           customFields
//         }
//         totalQuantity
//         subTotal
//         subTotalWithTax
//         currencyCode
//         shippingLines {
//           shippingMethod {
//             id: createdAt
//             updatedAt
//             code
//             name
//             description
//             fulfillmentHandlerCode
//             checker {
//               code
//               args {
//                 name
//                 value
//               }
//             }
//             calculator {
//               code
//               args {
//                 name
//                 value
//               }
//             }
//             translations {
//               id: createdAt
//               updatedAt
//               languageCode
//               name
//               description
//             }
//             customFields: JSON
//           }
//           price
//           priceWithTax
//           discountedPrice
//           discountedPriceWithTax
//           discounts {
//             adjustmentSource
//             type
//             description
//             amount
//             amountWithTax
//           }
//         }
//         shipping
//         shippingWithTax
//         total
//         totalWithTax
//         taxSummary {
//           description
//           taxRate
//           taxBase
//           taxTotal
//         }
//       }
//       totalItems
//     }
//     user
//   }
// `;

//

const CHANGE_USER_PASSWORD = gql`
  mutation updateCustomerPassword(
    $currentPassword: String!
    $newPassword: String!
  ) {
    updateCustomerPassword(
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
      __typename
      ... on ErrorResult {
        message
      }
    }
  }
`;

const CHANGE_USER_EMAIL = gql`
  mutation requestUpdateCustomerEmailAddress(
    $newEmailAddress: String!
    $password: String!
  ) {
    requestUpdateCustomerEmailAddress(
      newEmailAddress: $newEmailAddress
      password: $password
    ) {
      __typename
      ... on ErrorResult {
        message
      }
    }
  }
`;

const ACTIVE_ORDER = gql`
  query activeOrder {
    activeOrder {
      id
      state
      customFields
      shippingWithTax
      discounts {
        amount
        amountWithTax
        adjustmentSource
        type
        description
      }
      couponCodes
      promotions {
        id
        name
        couponCode
        conditions {
          code
          args {
            name
            value
          }
        }
      }
      lines {
        id
        customFields {
          customOptions
        }
        productVariant {
          id
          name
          product {
            name
          }
          stockLevel
          sku
          createdAt
          assets {
            source
          }
          options {
            id
            name
            code
          }
          customFields
          product {
            id
            slug
            assets {
              source
              preview
              height
              width
            }
          }
          price
          priceWithTax
        }
        quantity
        linePriceWithTax
      }
      subTotalWithTax
      total
      totalWithTax
    }
  }
`;
const ADD_ITEM_TO_ORDER = gql`
  mutation ($productVariantId: ID!, $quantity: Int!, $customFields: String) {
    addItemToOrder(
      productVariantId: $productVariantId
      quantity: $quantity
      customFields: { customOptions: $customFields }
    ) {
      __typename
      ... on Order {
        id
        lines {
          id
          productVariant {
            id
            name
            stockLevel
            sku
            createdAt
            customFields
            assets {
              source
            }
            options {
              id
              name
              code
            }
            product {
              id
              slug
              name
              assets {
                source
                preview
                height
                width
              }
            }
            price
            priceWithTax
          }
          quantity
          linePriceWithTax
        }
        total
        totalWithTax
      }
    }
  }
`;
// const REMOVE_ALL_ORDER_LINES = gql`
// mutation newMut(){
//   removeAllOrderLines(){
//     __typename
//   }
// }`;
const REMOVE_ORDER_LINE = gql`
  mutation newMut($orderLineId: ID!) {
    removeOrderLine(orderLineId: $orderLineId) {
      __typename
    }
  }
`;

const APPLY_CUPON_CODE = gql`
  mutation ($couponCode: String!) {
    applyCouponCode(couponCode: $couponCode) {
      __typename
      ... on Order {
        total
        id
        code
        state
        discounts {
          adjustmentSource
          description
          type
        }
        promotions {
          id
          couponCode
          actions {
            args {
              name
              value
            }
          }
        }
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

const REMOVE_CUPON_CODE = gql`
  mutation ($couponCode: String!) {
    removeCouponCode(couponCode: $couponCode) {
      __typename
      ... on Order {
        total
        id
        code
        state
        discounts {
          adjustmentSource
          description
          type
        }
      }
    }
  }
`;

const SET_ORDER_SHIPPING_ADDRESS = gql`
  mutation setOrderShippingAddress($input: CreateAddressInput!) {
    setOrderShippingAddress(input: $input) {
      __typename
    }
  }
`;

const SET_ORDER_BILLING_ADDRESS = gql`
  mutation setOrderBillingAddress($input: CreateAddressInput!) {
    setOrderBillingAddress(input: $input) {
      __typename
    }
  }
`;
const ADJUST_ORDER_LINE = gql`
  mutation AdjustOrderLine($orderLineId: ID!, $quantity: Int!,$customFields: String) {
    adjustOrderLine(orderLineId: $orderLineId, quantity: $quantity,customFields: { customOptions: $customFields }) {
      __typename
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;
const REMOVE_ITEM_FROM_ORDER = gql`
  mutation RemoveItemFromOrder($orderLineId: ID!) {
    removeOrderLine(orderLineId: $orderLineId) {
      __typename
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;
const RESET_PASSWORD = gql`
  mutation RequestPasswordReset($emailAddress: String!) {
    requestPasswordReset(emailAddress: $emailAddress) {
      __typename
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;
const RESET_PASSWORD_WITH_TOKEN = gql`
  mutation ($token: String!, $password: String!) {
    resetPassword(token: $token, password: $password) {
      __typename
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

const AUTHENTICATE_WITH_GOOGLE = gql`
  mutation Authenticate($token: String!) {
    authenticate(input: { google: { token: $token } }) {
      ... on CurrentUser {
        id
        identifier
        channels {
          token
          code
        }
      }
    }
  }
`;

const AUTHENTICATE_WITH_FACEBOOK = gql`
  mutation Authenticate($token: String!) {
    authenticate(input: { facebook: { token: $token } }) {
      __typename
    }
  }
`;
const GET_ORDER_BY_CODE = gql`
  {
    order(id: "1") {
      customer {
        firstName
      }
      totalWithTax
    }
  }
`;
const ELIGIBLE_SHIPPING_METHODS = gql`
  {
    eligibleShippingMethods {
      id
      code
      name
      priceWithTax
    }
  }
`;
const SET_ORDER_SHIPPING_METHOD = gql`
  mutation SetOrderShippingMethod {
    setOrderShippingMethod(shippingMethodId: "1") {
      __typename
      ... on ErrorResult {
        message
      }
    }
  }
`;
const TRANSITION_ORDER_STATE = gql`
  mutation transitionOrderToState($state: String!) {
    transitionOrderToState(state: $state) {
      __typename
      ... on OrderStateTransitionError {
        errorCode
        toState
        fromState
        message
        errorCode
      }
    }
  }
`;

const RAZORPAY_PAYMENT_REQUEST = gql`
  mutation ($inputfrom: PaymentInput!) {
    addPaymentToOrder(input: $inputfrom) {
      __typename
      ... on Order {
        id
        code
        payments {
          metadata
        }
      }
    }
  }
`;
const ACTIVE_ORDER_FOR_PAYMENT = gql`
  query {
    activeOrder {
      code
      id

      customer {
        firstName
      }
      shipping
      shippingAddress {
        fullName
      }
      state
    }
  }
`;
const ELIGIBLE_PAYMENT_METHODS = gql`
  {
    eligiblePaymentMethods {
      id
      code
      name
      isEligible
    }
  }
`;
const ACTIVE_ORDER_FOR_BILLING = gql`
  {
    activeOrder {
      id
      code
      shippingAddress {
        fullName
        streetLine1
        city
        province
        postalCode
        country
        countryCode
        phoneNumber
      }
      customer {
        firstName
        lastName
      }
      totalWithTax
    }
  }
`;
const ADD_PAYMENT_TO_STRIPE = gql`
  mutation addPaymentToStripe($metadata: JSON!) {
    addPaymentToOrder(input: { method: "stripe", metadata: $metadata }) {
      __typename
    }
  }
`;
const NEXT_ORDER_STATES = gql`
  {
    nextOrderStates
  }
`;

export {
  GET_PRODUCT_TOTAL,
  GET_ALL_PRODUCTS,
  GET_SINGLE_PRODUCT,
  UPDATE_CUSTOMER_ADDRESS,
  DELETE_CUSTOMER_ADDRESS,
  CREATE_CUSTOMER_ADDRESS,
  GET_HOME_PRODUCTS,
  REGISTER_USER,
  Login_User,
  CURRENT_USER_DATA,
  CHANGE_USER_EMAIL,
  CHANGE_USER_PASSWORD,
  ACTIVE_ORDER,
  ACTIVE_ORDER_FOR_PAYMENT,
  ADD_ITEM_TO_ORDER,
  SET_ORDER_SHIPPING_ADDRESS,
  ADJUST_ORDER_LINE,
  REMOVE_ITEM_FROM_ORDER,
  RESET_PASSWORD,
  AUTHENTICATE_WITH_GOOGLE,
  AUTHENTICATE_WITH_FACEBOOK,
  GET_ORDER_BY_CODE,
  ELIGIBLE_PAYMENT_METHODS,
  ELIGIBLE_SHIPPING_METHODS,
  ACTIVE_ORDER_FOR_BILLING,
  SET_ORDER_SHIPPING_METHOD,
  GET_ALL_FILTER_PRODUCT,
  GET_FILTER_CUSTOM_FIELD,
  NEXT_ORDER_STATES,
  TRANSITION_ORDER_STATE,
  ADD_PAYMENT_TO_STRIPE,
  RAZORPAY_PAYMENT_REQUEST,
  CREATE_GUEST_CUSTOMER,
  CURRENT_USER_ORDER_DATA,
  CREATE_WISHLIST,
  GET_RELATED_PRODUCTS,
  GET_ACTIVE_WISHLIST,
  GET_PRODUCT_WISHLIST,
  APPLY_CUPON_CODE,
  SET_ORDER_BILLING_ADDRESS,
  REMOVE_CUPON_CODE,
  RESET_PASSWORD_WITH_TOKEN,
  GET_FEATURED_PRODUCTS_IDS,
  GET_FEATURED_PRODUCT,
  IS_ACTIVE_ORDER
};
