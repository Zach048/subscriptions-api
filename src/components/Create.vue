<template>
    <div class="pt-5">
        <validation-observer ref="observer" v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(create)" method="post">
        <validation-provider
          name="name"
          :rules="{ required: true }"
          v-slot="validationContext"
        >
                      <b-form-group label="Name" label-for="name">

                <b-form-input
                    type="text"
                    class="form-control"
                    id="name"
                    v-model="subscription.name"
                    name="name"
                    placeholder="Enter name"
                    :state="getValidationState(validationContext)"></b-form-input>
                <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
            </b-form-group>
            </validation-provider>
            <validation-provider
          name="currency"
          :rules="{ required: true }"
          v-slot="validationContext"
        >
            <b-form-group label="Currency" label-for="currency">
                <b-form-select
                    name="currency"
                    class="form-control"
                    id="currency"
                    v-model="subscription.currency"
                    :state="getValidationState(validationContext)">
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                </b-form-select>
                <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
            </b-form-group>
            </validation-provider>
              <validation-provider
          name="amount"
          :rules="{ required: true, numeric: true }"
          v-slot="validationContext"
        >
            <b-form-group label="Amount" label-for="amount">
                <b-form-input
                    type="number"
                    name="amount"
                    class="form-control"
                    id="amount"
                    v-model="subscription.amount"
                    placeholder="Enter amount"
                    :state="getValidationState(validationContext)"></b-form-input>
                <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
            </b-form-group>
            </validation-provider>
             <validation-provider
          name="description"
          :rules="{ required: true }"
          v-slot="validationContext"
        >
            <b-form-group label="Description" label-for="description">
                <b-form-textarea
                    name="description"
                    class="form-control"
                    id="description"
                    v-model="subscription.description"
                    cols="30"
                    rows="2"
                    :state="getValidationState(validationContext)"></b-form-textarea>
                <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
            </b-form-group>
            </validation-provider>
            <button type="submit" class="btn btn-primary">Submit</button>
        </b-form>
            </validation-observer>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    data() {
        return {
            subscription: {
                name: '',
                currency: '',
                amount: '',
                description: '',
            },
            submitted: false
        }
    },
    methods: {
        getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
        create() {
            
                this.submitted = true;
                console.log(this.currency)
                this.$api
                    .post(process.env.VUE_APP_API+'subscriptions/',
                        this.subscription
                    )
                    .then(response => {
                        this.$router.push('/index');
                    })
        }
    },
}
</script>