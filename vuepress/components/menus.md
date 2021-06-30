# Menus

## Menus & Menu Items

<!-- #region menus -->
<section class="mds">
  <div class="mt-20">
    <strong>Button Menus</strong>
    <div class="flex items-center mt-20 space-x-20">
      <div>
        <mx-button ref="editButton" btn-type="action" dropdown>Edit</mx-button>
        <mx-menu ref="editMenu">
          <mx-menu-item @click="() => {}">Undo</mx-menu-item>
          <mx-menu-item @click="() => {}" disabled>Redo</mx-menu-item>
          <mx-menu-item @click="() => {}">Cut</mx-menu-item>
          <mx-menu-item @click="() => {}">Copy</mx-menu-item>
        </mx-menu>
      </div>
      <div>
        <mx-icon-button ref="actionButton" chevron-down />
        <mx-menu ref="actionMenu" placement="bottom-start">
          <mx-menu-item @click="() => {}">New&hellip;</mx-menu-item>
          <mx-menu-item @click="() => {}">Open&hellip;</mx-menu-item>
          <hr>
          <mx-menu-item @click="() => {}">Save</mx-menu-item>
          <mx-menu-item @click="() => {}">Save As&hellip;</mx-menu-item>
          <hr>
          <mx-menu-item @click="() => {}">Close</mx-menu-item>
        </mx-menu>
      </div>
      <div>
        <mx-icon-button ref="dotsButton" icon="ph-dots-three-outline" />
        <mx-menu ref="dotsMenu" dense placement="top-start">
          <mx-menu-item @click="() => {}">Hide</mx-menu-item>
          <mx-menu-item @click="() => {}">Rename</mx-menu-item>
        </mx-menu>
      </div>
    </div>
  </div>
</section>
<!-- #endregion menus -->

<<< @/vuepress/components/menus.md#menus
<<< @/vuepress/components/menus.md#menus-anchorEl

### Menu Properties

<script>
export default {
  data() {
    return {
      isDogMenuOpen: false
    }
  },
  // #region menus-anchorEl
  mounted() {
    this.$refs.editMenu.anchorEl = this.$refs.editButton
    this.$refs.actionMenu.anchorEl = this.$refs.actionButton
    this.$refs.dotsMenu.anchorEl = this.$refs.dotsButton
  }
  // #endregion menus-anchorEl
}
</script>
