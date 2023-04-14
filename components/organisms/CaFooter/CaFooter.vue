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
    <section class="ca-footer__section ca-footer__section--about">
      <CaContainer>
        <div class="ca-footer__about">
          <h2 class="ca-footer__about-title">{{ $t('FOOTER_ABOUT_TITLE') }}</h2>
          <p class="ca-footer__about-text">
            {{ $t('FOOTER_ABOUT_TEXT') }}
          </p>
        </div>
      </CaContainer>
    </section>
    <section class="ca-footer__section ca-footer__section--content">
      <CaContainer class="ca-footer__content-holder">
        <section class="ca-footer__column ca-footer__column--menu">
          <CaFooterNavigationAccordion
            v-if="$store.getters.viewport === 'phone'"
            menu-location-id="footer-first"
          />
          <CaFooterNavigation v-else menu-location-id="footer-first" />
        </section>
        <section class="ca-footer__column ca-footer__column--menu">
          <CaFooterNavigationAccordion
            v-if="$store.getters.viewport === 'phone'"
            menu-location-id="footer-second"
          />
          <CaFooterNavigation v-else menu-location-id="footer-second" />
        </section>
        <section class="ca-footer__column ca-footer__column--menu">
          <CaFooterNavigationAccordion
            v-if="$store.getters.viewport === 'phone'"
            menu-location-id="footer-third"
          />
          <CaFooterNavigation v-else menu-location-id="footer-third" />
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
            Copyright &copy; {{ $config.currentChannelSettings.siteName }}
          </div>
          <a
            class="ca-footer__powered-by"
            href="https://www.geins.io"
            target="_blank"
          >
            Powered by
            <CaSvgAsset
              class="ca-footer__geins"
              folder="logos"
              :filename="theme === 'dark' ? 'geins-white' : 'geins-black'"
              alt="Geins logo"
            />
          </a>
        </div>
      </CaContainer>
    </section>
  </footer>
</template>
<script>
/*
  Footer component for the site.
*/
export default {
  name: 'CaFooter',
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
@import 'organisms/ca-footer';
</style>
