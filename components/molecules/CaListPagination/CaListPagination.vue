<template>
  <div class="ca-list-pagination">
    <div class="ca-list-pagination__showing">
      {{
        $t('PAGINATION_SHOWING', {
          sum: showing,
          total: totalCount
        })
      }}
      {{ $tc('PRODUCT_LOWERCASE', totalCount) }}
    </div>
    <CaListCountBar
      :min-count="minCount"
      :max-count="maxCount"
      :total-count="totalCount"
    />
    <CaButton
      v-if="direction === 'next'"
      class="ca-list-pagination__button ca-list-pagination__button--next"
      :disabled="allProductsLoaded"
      color="ghost"
      :loading="loading"
      @clicked="$emit('loadmore')"
    >
      {{ $t('LOAD_MORE') }}
    </CaButton>
    <CaButton
      v-else
      class="ca-list-pagination__button ca-list-pagination__button--prev"
      :loading="loading"
      color="ghost"
      @clicked="$emit('loadprev')"
    >
      {{ $t('LOAD_PREVIOUS') }}
    </CaButton>
  </div>
</template>
<script>
// @group Molecules
// @vuese
export default {
  name: 'CaListPagination',
  mixins: [],
  props: {
    direction: {
      type: String,
      default: 'next', // 'prev'
      validator(value) {
        return ['next', 'prev'].includes(value);
      }
    },
    showing: {
      type: String,
      required: true
    },
    totalCount: {
      type: Number,
      required: true
    },
    allProductsLoaded: {
      type: Boolean,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    },
    minCount: {
      type: Number,
      required: true
    },
    maxCount: {
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
.ca-list-pagination {
  padding: $px32 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  --count-bar-active-color: #{$c-darkest-gray};
  --count-bar-background-color: #{$c-medium-gray};

  &__button {
    overflow-anchor: none;
  }
  &__showing {
    margin-bottom: $px12;
  }
}
</style>
