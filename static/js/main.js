/* globals HueWheel */

(function() {
  'use strict';

  var hueWheel;
  var $toggleStateButton;

  /**
   * DOM ready
   */
  $(function() {
    $toggleStateButton = $('#toggleOnOff');
    $toggleStateButton.on('click', onToggleState);

    $.ajax({
      url: '/leds/state',
      type: 'GET',
      success: init
    });
  });

  /**
   * Init
   * @param {Object} response
   */
  function init(response) {
    hueWheel = new HueWheel('hueWheel', {
      changeSaturation: false,
      changeLightness: false,
      showColorSpot: false,
      diameter: 300,
      thicknessHue: 60,
      hue: 200,
      onChange: onHueWheelUpdate
    });

    toggleStateButton(response.status === 'on');
  }

  /**
   * Handler for the on/off toggle button
   */
  function onToggleState() {
    $.ajax({
      url: '/leds/toggle',
      type: 'GET',
      success: function(response) {
        toggleStateButton(response.status === 'on');
      }
    });
  }

  /**
   * Handler for the hue wheel update
   * @param {Event} event
   */
  function onHueWheelUpdate(event) {
    var colour = '#' + byteToHex(event.r) + byteToHex(event.g) + byteToHex(event.b);

    $.ajax({
      url: '/leds/colour',
      type: 'POST',
      data: {colour: colour},
      success: function(response) {
        toggleStateButton(response.status === 'on');
      }
    });
  }

  /**
   * Toggles the state button
   * @param {Boolean} toggle
   */
  function toggleStateButton(toggle) {
    $toggleStateButton.toggleClass('is-active', toggle);
  }

  /**
   * Returns the hex value for the given byte
   * @param {int} byte
   * @return {String}
   */
  function byteToHex(byte) {
    var hex = byte.toString(16);

    if(hex.length === 1) {
      hex = '0' + hex;
    }

    return hex;
  }

}());
