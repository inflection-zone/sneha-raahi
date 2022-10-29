<script>
    import { getContext } from 'svelte';
    import { fly } from 'svelte/transition';
    import Popup from './popup.svelte';
    import Dialog from './dialog.svelte';

    const { open } = getContext('simple-modal');

    let opening = false;
    let opened = false;
    let closing = false;
    let closed = false;

    const showPopup = () => {
        open(Popup, { title: "Title", message: "It's a popup!" });
    };

    let name;
    let status = 0;

    const onCancel = (text) => {
        name = '';
        status = -1;
    }

    const onOkay = (text) => {
        name = text;
        status = 1;
    }

    const showDialog = () => {
        open(
            Dialog,
            {
                message: "What is your name?",
                hasForm: true,
                onCancel,
                onOkay
            },
            {
                closeButton: false,
            closeOnEsc: false,
            closeOnOuterClick: false,
            }
        );
    };

  </script>

  <section>
      <button on:click={showPopup}>Show a popup!</button>
      <br/>
      <!-- <button on:click={showPopupLong}>Show a popup with long text!</button>
      <br/> -->
      <!-- <button on:click={showPopupCustom}>Show a customized popup and listen to events!</button>
      <br/> -->
      <button on:click={showDialog}>Show a dialog!</button>

      {#if status === 1}
          <p>Hi {name}! 👋</p>
      {:else if status === -1}
          <p><em>Dialog was canceled</em></p>
      {/if}

      <div id="state">
          {#if opening}
              <p>opening modal...</p>
          {:else if opened}
              <p>opened modal!</p>
          {:else if closing}
              <p>closing modal...</p>
          {:else if closed}
              <p>closed modal!</p>
          {/if}
      </div>
  </section>

  <style>
      section {
          padding-top: 0.5em;
      }

      #state {
          position: absolute;
          top: 0;
          right: 0;
          opacity: 0.33;
          font-size: 0.8em;
      }
  </style>