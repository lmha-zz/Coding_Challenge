sendHubApp.controller('contacts', ['$scope', '$http', 'ContactFactory', function($scope, $http, ContactFactory) {
  $scope.oneAtATime = true;
  $scope.editing = false;
  $scope.form_name = "Create Contact";
  $scope.recipientID;
  $scope.recipient;
  $scope.recipientPhoneNumber;
  $scope.new_contact = {};

  $scope.newContact = function() {
    $scope.errors = '';
    ContactFactory.createContact($scope.new_contact,
      function(errs) {
        $scope.errors = errs.errors;
      },
      function(contacts) {
        $scope.contacts = contacts;
      }
      );
    $scope.new_contact = null;
  }

  $scope.change = function() {
    console.log('changed!')
  }

  $scope.selectContact = function(contact) {
    $scope.recipientID = contact._id;
    $scope.recipient = contact.contact_name;
    $scope.recipientPhoneNumber = contact.phone_number;
    $scope.new_contact.contact_name = contact.contact_name;
    $scope.new_contact.phone_number = contact.phone_number;
    $scope.editing = true;
  }

  $scope.updateContact = function() {
    console.log($scope.new_contact)
    console.log($scope.recipientID)
    $scope.messageError = "iN THE UPDATE CONTACT!!";
    // ContactFactory.updateContact($scope.new_contact,
    //   function(errs) {
    //     $scope.errors = errs.errors;
    //   },
    //   function(contacts) {
    //     $scope.contacts = contacts;
    //   }
    // );
  }

  $scope.cancelUpdate = function() {
    $scope.new_contact = {};
    $scope.editing = false;
  }

  $scope.sendMessage = function() {
    $scope.messageError = [];
    if(!$scope.recipientPhoneNumber) {
      $scope.messageError.push("Please type in the recipient's phone number.");
    } else if($scope.new_message == undefined) {
      $scope.messageError.push("Cannot send an empty message.");
    } else {
      console.log($scope.new_message.text_message)
      var url = "https://api.sendhub.com/v1/messages/?username=8587075261&api_key=d64b323515f040f41028aa2fe981af40f44ca6d3"
      $http.post(
        url,
        {
          contacts: [$scope.recipientPhoneNumber],
          text: $scope.new_message.text_message
        }
      )
      $scope.new_message = null;
    }
  }

  ContactFactory.getContacts(function(contacts){
    $scope.contacts = contacts;
  });
}])