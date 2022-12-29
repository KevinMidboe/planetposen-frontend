<script lang="ts">
  import { onMount } from 'svelte';
  import Time from './Time.svelte';
  import CircleLoading from './loading/CircleLoading.svelte';
  import { buildApiUrl } from '$lib/utils/apiUrl';
  import type { IShipmentResponse } from '$lib/interfaces/IShipping';

  export let shipment: IShipmentResponse;

  interface TrackingEvent {
    city: string;
    consignmentEvent: boolean;
    country: string;
    countryCode: string;
    date: string;
    dateIso: Date;
    description: string;
    displayDate: string;
    displayTime: string;
    gpsMapUrl: string;
    gpsXCoordinate: string;
    gpsYCoordinate: string;
    insignificant: boolean;
    lmCauseCode: string;
    lmEventCode: string;
    lmMeasureCode: string;
    postalCode: string;
    recipientSignature: null;
    status: string;
    unitId: string;
    unitInformationUrl: null;
    unitType: string;
  }

  let trackedShipment: TrackingEvent[] | null = null;

  async function getTracking() {
    const url = buildApiUrl(`/api/v1/shipment/${shipment?.shipment_id}/track`);
    try {
      trackedShipment = null;
      const trackingResponse = await fetch(url).then((resp) => resp.json());

      trackedShipment = trackingResponse?.shipment?.events || [];
    } catch (error) {
      console.log('api error from track:', error);
    }
  }

  onMount(() => {
    if (!shipment) return;
    getTracking();
  });
</script>

<section>
  <h2>Shipment history</h2>

  {#if trackedShipment === null}
    <div class="loading-content">
      <CircleLoading />
    </div>
  {:else if trackedShipment?.length > 0}
    <ul class="tracking">
      {#each trackedShipment as event}
        <li>
          <span class="indicator"></span>
          <div class="details">
            <span class="message">{event.description}</span>

            {#if event?.status}
              <div>
                <span>{event.status} - </span>
                <span style="text-transform: capitalize;"><Time time="{event.date}" /></span>
              </div>
            {/if}

            <div class="location">
              {#if event.city.length > 0}
                <span>{event?.city?.toLowerCase()}</span>
              {/if}

              {#if event.countryCode.length > 0}
                <span data-separator=","
                  >{event.city.length > 0 ? event?.countryCode : event?.country}</span
                >
              {/if}
            </div>
          </div>
        </li>
      {/each}
    </ul>
  {:else}
    <div>
      <h3>Error! Unable to retrieve shipment history</h3>
      <p>
        Try again later or contact <a class="link" href="mailto:support@planet.schleppe.cloud"
          >support@planet.schleppe.cloud</a
        >
      </p>
    </div>
  {/if}
</section>

<style lang="scss">
  @import '../../styles/media-queries.scss';
  @import '../../styles/effects.scss';

  h2 {
    font-size: 1.4rem;
    margin-bottom: 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  }

  .tracking {
    padding-left: 1.5rem;

    @include mobile {
      padding-left: 0;
    }

    li {
      display: flex;
      margin: 1rem 0.3rem;
      padding: 0.8rem 0.3rem;
      position: relative;

      &:first-of-type .indicator {
        @include pulse-dot;
        &::after {
          left: calc(0.6rem + 5.5px);
        }

        &::before {
          height: 100%;
          top: 50%;
        }
      }

      &:last-of-type .indicator::before {
        height: 100%;
        top: -50%;
      }
    }

    .indicator {
      display: block;
      align-self: center;
      min-width: 20px;
      min-height: 20px;
      background-color: #e32d22;
      border-radius: 50%;
      margin-right: 2rem;

      @include mobile {
        margin-right: 1.5rem;
      }

      &::before {
        content: '';
        position: absolute;
        top: 1rem;
        left: calc(0.3rem + 8.5px);
        height: calc(100% + 1rem);
        width: 3px;
        background-color: #e32d22;
      }
    }

    .details {
      display: flex;
      flex-direction: column;

      .message {
        margin-bottom: 0.5rem;
        font-weight: bold;
      }

      .location {
        text-transform: capitalize;

        span:nth-of-type(2) {
          position: relative;
          margin-left: 3px;
          padding-left: 3px;

          &::before {
            content: attr(data-separator) ' ';
            position: absolute;
            left: -8px;
          }
        }
      }
    }
  }

  .loading-content {
    width: 100%;
    margin-top: 2rem;
    display: flex;
    justify-content: center;
  }
</style>
