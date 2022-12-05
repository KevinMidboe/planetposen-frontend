<script lang="ts">
  import BadgeType from '../interfaces/BadgeType';

  const badgeIcons = {
    [BadgeType.INFO]: '⏳',
    [BadgeType.PENDING]: '📦',
    [BadgeType.WARNING]: '⚠️',
    [BadgeType.SUCCESS]: '✓',
    [BadgeType.ERROR]: 'X'
  };

  export let title = 'Info';
  export let type: BadgeType = BadgeType.INFO;

  if (title === 'CONFIRMED') {
    type = BadgeType.SUCCESS;
  }

  $: icon = badgeIcons[type];
  $: badgeClass = `badge ${type}`;
</script>

<div class="{badgeClass}">
  <span>{title}</span>
  <span class="icon">{icon}</span>
</div>

<style lang="scss" module="scoped">
  .badge {
    padding: 0.2rem 0.5rem;
    border-radius: 6px;
    text-align: center;
    width: fit-content;
    font-size: 0.95rem;
    background-color: rgb(235, 238, 241);
    color: rgb(84, 89, 105);
    margin: 0.2rem;

    .icon {
      margin-left: 0.3rem;
      font-size: 0.8rem;
    }

    &.success {
      background-color: rgb(215, 247, 194);
      color: rgb(0, 105, 8);
    }

    &.error {
      background-color: rgb(255, 231, 242);
      color: rgb(179, 9, 60);
    }

    &.warning {
      background-color: rgb(252, 237, 185);
      color: rgb(168, 44, 0);
    }

    &.pending {
      background-color: lightblue;
      color: darkslateblue;
    }
  }
</style>
