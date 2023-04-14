<template>
  <div class="ca-list-settings">
    <CaClickable
      class="ca-list-settings__filter-toggle"
      @clicked="
        $store.commit('contentpanel/open', {
          name: 'filters'
        })
      "
    >
      <CaIconAndText
        class="ca-list-settings__icon-text"
        icon-name="filter"
        icon-position="right"
        base-element="div"
      >
        {{ $t('FILTERS') }}
      </CaIconAndText>
    </CaClickable>
    <div class="ca-list-settings__sort">
      <span class="ca-list-settings__title">
        {{ $t('SORT_TITLE') }}
      </span>
      <CaInputSelect
        v-if="sort"
        v-model="sort"
        class="ca-list-settings__sort-select"
        :options="sortOptions"
        icon-name="triangle"
      />
    </div>
  </div>
</template>
<script>
import MixProductListSort from 'MixProductListSort';
/*
  Renders the list settings component. 
  To override defaultSortOptions, add your own "defaultSortOptions" array to data

  Props:
    activeProducts: Number
      The number of active products.
    activeFilters: Number
      The number of active filters.
    currentSort: String
      The current sort of the product list (this prop exists in MixProductListSort)

  Events:
    sortchange: String
      Emitted (from Mixin MixProductListSort) when the sort value changes.

*/
export default {
  name: 'CaListSettings',
  mixins: [MixProductListSort],
  props: {
    activeProducts: {
      type: Number,
      required: true
    },
    activeFilters: {
      type: Number,
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
@import 'organisms/ca-list-settings';
</style>
