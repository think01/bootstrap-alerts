Template.bootstrapAlert.rendered = function () {
    var alert = this.data;
    var $node = $(this.firstNode);

    Meteor.defer(function () {
        Alerts.collection_.update(alert._id, {
            $set: { seen: true }
        });
    });

    $node.removeClass('hide').hide().fadeIn(alert.options.fadeIn, function () {

        if (alert.options.autoHide) {
            Meteor.setTimeout(function () {
                    $node.fadeOut(alert.options.fadeOut, function(){
                        Alerts.removeById(alert._id);
                    });
                },
                alert.options.autoHide);
        }
    });

    // Register on Bootstrap Alert close event in order to remove the alert from the internal collection
    $node.on("closed.bs.alert", function () {
        Alerts.removeById(alert._id);
    });

};

Template.bootstrapAlerts.helpers({
    alerts: function () {
        return Alerts.collection_.find();
    }
});