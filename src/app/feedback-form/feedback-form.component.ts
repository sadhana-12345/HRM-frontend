import { Component } from '@angular/core';
import { FeedbackService } from '../feedback.service';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent {
  feedbackData = {
    fullname: '',
    email: '',
    phone: '',
    message: ''
  };

  isSuccess: boolean = false; // Variable to track form submission success
  isSubmitting: boolean = false; // Variable to track form submission in progress

  constructor(private feedbackService: FeedbackService) {}

  submitFeedback(): void {
    // Prevent multiple submissions while the form is being submitted
    if (this.isSubmitting) {
      return;
    }

    // Call the feedback service to submit the feedback data
    this.isSubmitting = true; // Set isSubmitting to true to disable submit button
    this.feedbackService.submitFeedback(this.feedbackData).subscribe(
      () => {
        // Reset the form on success
        this.feedbackData = {
          fullname: '',
          email: '',
          phone: '',
          message: ''
        };
        this.isSuccess = true; // Update success status
        console.log('Feedback submitted successfully');
      },
      error => {
        // Check if the status code is 201 (Created), treat it as successful
        if (error.status === 201) {
          this.isSuccess = true;
          console.log('Feedback submitted successfully');
        } else {
          console.error('Error submitting feedback:', error);
        }
      }
    ).add(() => {
      this.isSubmitting = false; // Reset isSubmitting after submission completes
    });
  }
}
