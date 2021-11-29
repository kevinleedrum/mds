# Banners

A banner displays a prominent message and related optional actions. Banners can be used to notify users in a less disruptive way than [Dialogs](/components/dialogs.html). Also consider [Snackbars](/components/snackbars.html) for alerts that disappear automatically.

<section class="mds">
  <div class="space-y-20 mt-20">
    <!-- #region banners -->
    <mx-banner :is-open="isOpenA" sticky class="top-56">
      You will need to sign in to save changes.
      <div slot="actions">
        <mx-button btn-type="text" @click="isOpenA = false">Continue as Guest</mx-button>
        <mx-button btn-type="text" @click="isOpenA = false">Sign In</mx-button>
      </div>
    </mx-banner>
    <p>The above banner is sticky (scroll down).</p>
    <mx-banner is-open>This is a banner without actions.</mx-banner>
    <mx-banner :is-open="isOpenB" error>
      You have lost connection to the internet.  This app is offline.
      <div slot="actions">
        <mx-button btn-type="text" @click="isOpenB = false">Dismiss</mx-button>
        <mx-button btn-type="text" @click="isOpenB = false">Try again</mx-button>
      </div>
    </mx-banner>
    <mx-banner :is-open="isOpenC">
      It is now safe to turn off your computer.
      <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" class="w-40 h-40" slot="image">
      <div slot="actions">
        <mx-button btn-type="text" @click="isOpenC = false">Shut down</mx-button>
      </div>
    </mx-banner>
    <mx-button
      btn-type="outlined"
      :disabled="isOpenA && isOpenB && isOpenC"
      class="mt-40"
      @click="isOpenA = isOpenB = isOpenC = true"
    >
      Reset Banners
    </mx-button>
    <!-- #endregion banners -->
  </div>
</section>

<<< @/vuepress/components/banners.md#banners

<script>
export default {
  data() {
    return {
      isOpenA: true,
      isOpenB: true,
      isOpenC: true
    }
  },
}
</script>
