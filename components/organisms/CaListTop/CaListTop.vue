<template>
  <div class="ca-list-top">
    <CaWidgetArea
      class="ca-list-top__widget-area"
      family="Productlist"
      area-name="Product list hero"
      :filters="widgetAreaFilters"
    />
    <CaContainer class="ca-list-top__container">
      <CaBreadcrumbs v-if="listInfo" :current="breadcrumbsCurrent" />
      <div class="ca-list-top__text">
        <h1 v-if="listInfo && !listInfo.hideTitle" class="ca-list-top__title">
          {{ listInfo.name }}
        </h1>
        <CaReadMore
          v-if="
            listInfo &&
              !!listInfo.primaryDescription &&
              !listInfo.hideDescription
          "
          class="ca-list-top__description"
          :max-height="$store.getters.viewportComputer ? 90 : 50"
        >
          <CaHtml :content="listInfo.primaryDescription" />
        </CaReadMore>
      </div>
    </CaContainer>
  </div>
</template>
<script>
/*
  A component that displays the top of a list page.

  Props:
    type: String
      The type of list page
    listInfo: Object
      The list info object. Contains the name, description and subcategories of the list.

  Used in:
    - CaListPage
*/
export default {
  name: 'CaListTop',
  mixins: [],
  props: {
    type: {
      type: String,
      required: true
    },
    listInfo: {
      type: Object,
      default: () => {}
    },
    breadcrumbsCurrent: {
      type: Object,
      required: true
    },
    widgetAreaFilters: {
      type: Array,
      required: true
    }
  },
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'organisms/ca-list-top';
</style>
