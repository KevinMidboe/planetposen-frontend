<script lang="ts">
  import type ICustomer from '$lib/interfaces/ICustomer';

  export let customer: ICustomer;

  const zeroPadZip = (zipCode: number) => String(zipCode).padStart(4, '0');
</script>

<section>
  <h2>Customer</h2>
  <ul class="property-list">
    <li>
      <span class="label">Email</span>
      <span>{customer.email}</span>
    </li>

    <li>
      <span class="label">Name</span>
      <span class="name">{customer.first_name} {customer.last_name}</span>
    </li>

    <li>
      <span class="label">Street address</span>
      <span>{customer.street_address}</span>
    </li>

    <li>
      <span class="label">Zip & City</span>
      <span>{zeroPadZip(customer.zip_code)}, {customer.city}</span>
    </li>
  </ul>
</section>

<style lang="scss">
  @import './styles-order-page.scss';
</style>
