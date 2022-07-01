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
// @group Organisms
// @vuese
export default {
  name: 'CaListSettings',
  mixins: [],
  props: {
    activeProducts: {
      type: Number,
      required: true
    },
    currentSort: {
      type: String,
      required: true
    },
    activeFilters: {
      type: Number,
      required: true
    }
  },
  data: vm => ({
    sortOptions: [
      {
        label: vm.$t('SORT_LABEL_LATEST'),
        value: 'LATEST'
      },
      {
        label: vm.$t('SORT_LABEL_BESTSELLERS'),
        value: 'MOST_SOLD'
      },
      {
        label: vm.$t('SORT_LABEL_LOWEST_PRICE'),
        value: 'PRICE'
      },
      {
        label: vm.$t('SORT_LABEL_HIGHEST_PRICE'),
        value: 'PRICE_DESC'
      }
    ],
    sort: null
  }),
  computed: {},
  watch: {
    sort(newVal, oldVal) {
      if (oldVal !== null) {
        this.$emit('sortchange', newVal);
      }
    },
    currentSort() {
      this.sort = this.currentSort;
    }
  },
  mounted() {
    this.sort = this.currentSort;
  },
  methods: {}
};
</script>
<style lang="scss">
.ca-list-settings {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 0 $default-spacing;
  margin-top: $px20;
  border-bottom: $border-light;
  @include bp(laptop) {
    margin: $px40 0 $px10;
  }
  &__filter-toggle {
    display: flex;
    align-items: center;
    font-size: $font-size-m;
    .ca-icon {
      color: $c-text-primary;
      font-size: rem-calc(20);
    }
  }
  &__icon-text {
    width: 100%;
    justify-content: space-between;
  }
  &__filter-button-wrap {
    display: flex;
  }
  &__active-filters {
    margin: 0 0 0 rem-calc(6px);
  }
  &__title {
  }
  &__sort {
    display: flex;
    align-items: center;
    white-space: nowrap;
  }

  &__sort-select.ca-input-select {
    width: 100%;
    min-width: rem-calc(130);
    .ca-input-select__selected,
    .ca-input-select__select {
      border: none;
      color: $c-text-primary;
      padding: 0 rem-calc(17) 0 rem-calc(5);
    }
    .ca-input-select__select-wrap {
      border: none;
    }
    .ca-input-select__arrow {
      font-size: rem-calc(10);
      right: rem-calc(5);
      padding-bottom: rem-calc(3);
    }
  }
}
</style>
