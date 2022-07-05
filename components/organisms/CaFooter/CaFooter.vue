<template>
  <footer class="ca-footer">
    <section class="ca-footer__section ca-footer__section--newsletter">
      <CaContainer>
        <div class="ca-footer__newsletter">
          <h2 class="ca-footer__newsletter-title">
            {{ $t('NEWSLETTER_TITLE') }}
          </h2>
          <p class="ca-footer__newsletter-text">
            {{ $t('NEWSLETTER_TEXT') }}
          </p>
          <CaNewsletter
            class="ca-footer__newsletter-form"
            button-color="light"
          />
        </div>
      </CaContainer>
    </section>
    <section class="ca-footer__section ca-footer__section--content">
      <CaContainer class="ca-footer__content-holder">
        <section class="ca-footer__column">
          <CaFooterNavigation menu-location-id="footer-first" />
        </section>
        <section class="ca-footer__column">
          <CaFooterNavigation menu-location-id="footer-second" />
        </section>
        <section class="ca-footer__column">
          <CaFooterNavigation menu-location-id="footer-third" />
        </section>
        <section class="ca-footer__column ca-footer__column--logo">
          <CaLogo
            class="ca-footer__main-logo"
            theme="dark"
            :alt="$t('LOGO_ALT_TEXT')"
          />
        </section>
      </CaContainer>
    </section>
    <section class="ca-footer__section ca-footer__section--bottom">
      <CaContainer class="ca-footer__bottom">
        <div class="ca-footer__bottom-column ca-footer__bottom-column--logos">
          <CaSvgAsset
            class="ca-footer__logo ca-footer__logo--first"
            folder="logos"
            filename="klarna"
            alt="Klarna logo"
          />
          <CaSvgAsset
            class="ca-footer__logo"
            folder="logos"
            filename="visa"
            alt="Visa logo"
          />
          <CaSvgAsset
            class="ca-footer__logo"
            folder="logos"
            filename="mastercard"
            alt="Mastercard logo"
          />
        </div>
        <div class="ca-footer__bottom-column ca-footer__bottom-column--logos">
          <CaSvgAsset
            class="ca-footer__logo"
            folder="logos"
            filename="schenker"
            alt="Schenker logo"
          />
          <CaSvgAsset
            class="ca-footer__logo"
            folder="logos"
            filename="postnord"
            alt="Postnord logo"
          />
          <CaSvgAsset
            class="ca-footer__logo"
            folder="logos"
            filename="dhl"
            alt="DHL logo"
          />
        </div>
        <div
          class="ca-footer__bottom-column ca-footer__bottom-column--copyright"
        >
          <div class="ca-footer__copyright">
            Copyright &copy; Ralph Storefront
          </div>
          <a
            class="ca-footer__powered-by"
            href="https://www.carismar.com"
            target="_blank"
          >
            Powered by
            <CaSvgAsset
              class="ca-footer__carismar"
              folder="logos"
              :filename="theme === 'dark' ? 'carismar-white' : 'carismar-black'"
              alt="Carismar logo"
            />
          </a>
        </div>
      </CaContainer>
    </section>
  </footer>
</template>
<script>
// @group Organisms
// @vuese
export default {
  name: 'CaFooter',
  serverCacheKey() {
    return 'CaFooter';
  },
  mixins: [],
  props: {
    theme: {
      type: String,
      default: 'dark'
    }
  },
  data: () => ({}),
  computed: {
    uspLogoPlacement() {
      return this.$store.getters.viewport === 'phone' ? 'top' : 'left';
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
.ca-footer {
  --title-text-color: $c-text-inverse;
  margin-top: $default-spacing;
  background: var(--footer-background, $c-darkest-gray);
  color: var(--footer-color, $c-text-inverse);

  &__section {
    &--usps {
      padding: $px8 0;
    }
    &--newsletter {
      padding: $px40 0;
      @include bp(tablet) {
        padding: rem-calc(70) 0;
      }
    }
    &--content {
      padding: $px24 0 $px32;
    }

    &--bottom {
    }
  }

  &__usps {
    display: flex;
    text-align: center;
    justify-content: space-around;
    @include bp(tablet) {
      justify-content: center;
    }
  }

  &__usp {
    padding: 0 $px4;
    @include bp(tablet) {
      padding: 0 $px32;
    }
    .ca-icon-and-text__icon {
      margin-bottom: $px4;
      @include bp(tablet) {
        margin-bottom: 0;
      }
    }
  }

  &__newsletter {
    width: 100%;
    max-width: rem-calc(460);
    @include bp(tablet) {
    }
  }

  &__newsletter-title {
    font-family: $body-font;
    text-transform: uppercase;
    font-size: $font-size-m;
    margin: 0 0 $px20;
  }

  &__newsletter-text {
    @include title(rem-calc(46));
    margin: 0 0 $px40;
  }

  &__content-holder {
    @include bp(tablet) {
      display: flex;
    }
  }

  &__column {
    margin-bottom: $px20;
    line-height: 1.6;
    @include bp(tablet) {
      width: 15%;
    }
    &--logo {
      width: 55%;
    }
  }

  &__title {
    font-size: $font-size-l;
    margin-bottom: $px12;
    font-weight: $font-weight-bold;
    &:not(:first-child) {
      margin-top: $px20;
    }
    @include bp(tablet) {
      font-size: $font-size-xl;
    }
  }

  &__contact-title {
    font-weight: $font-weight-bold;
  }

  &__contact-info {
    text-decoration: underline;
  }

  &__vat-toggle {
    flex-direction: column;
  }

  &__nav-link {
    text-decoration: underline;
  }

  &__social {
    display: flex;
  }

  &__social-item {
    font-size: 30px;
    &:not(:last-child) {
      margin-right: $px20;
    }
  }

  &__main-logo {
    width: rem-calc(250);
    margin-left: auto;
  }

  &__bottom {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    @include bp(tablet) {
      justify-content: space-between;
    }
  }

  &__bottom-column {
    &--logos {
      display: flex;
      justify-content: space-between;
      margin: $px20 0;
    }
    &--copyright {
      width: 74%;
      padding: $px12 0;
      margin: 0 auto;
      border-top: $border-light;
      text-align: center;
      font-size: $font-size-xs;
      @include bp(tablet) {
        border: none;
        text-align: right;
        width: auto;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
      }
    }
  }

  &__logo {
    height: 15px;
    width: auto;
    padding: 0 $px4;
    @include bp(tablet) {
      height: 20px;
      padding: 0 $px16;
      &--first {
        padding-left: 0;
      }
    }
  }

  &__powered-by {
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    padding: rem-calc(2) 0 0;
  }

  &__carismar {
    height: 16px;
    margin-left: rem-calc(6);
    width: auto;
  }
}
</style>
