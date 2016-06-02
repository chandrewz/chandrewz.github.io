#### Creating the Job

First, I want to create a job that sends the email.

```
php artisan make:job SendReminderEmail --sync
```

This command will generate a new class in the app/Jobs directory. `--sync` overwrites the default queue implmentation. Starting with Laravel 5.2, `make:job` defaults to queued jobs so whenever `dispatch()` is called, the job will end up in your queue. For my job, I didn't want it queued. I wanted it to run and be done.

Simple enough. My `handle()` method simply sends the email.

```php
<?php

namespace App\Jobs;

use App\User;
use App\Jobs\Job;
use Illuminate\Contracts\Mail\Mailer;

class SendReminderEmail extends Job
{

	protected $user;

	/**
	 * Create a new job instance.
	 *
	 * @param  User $user
	 * @return void
	 */
	public function __construct(User $user)
	{
		$this->user = $user;
	}

	/**
	 * Execute the job.
	 *
	 * @param  Mailer $mailer
	 * @return void
	 */
	public function handle(Mailer $mailer)
	{
		$mailer->send('emails.reminder', ['user' => $this->user], function ($m) {
			$m->to($this->user->email, "$this->user->first $this->user->last")->subject('Hey, you haven\'t finished your registration!');
		});
	}
}
```

#### Create php artisan console command

Now I want my scheduler to call this job every so often. The scheduler needs some way to run it, so I went created an artisan command that can be ran from the terminal.

```
php artisan make:console SendEmails --command=emails:send
```

This generates a class at `app/Console/Commands/SendEmails.php`. The `--command` option assigns the terminal command name.

`SendEmails` finds all users that need an email to be sent, and dispatches the `SendReminderEmail` job.

#### Scheduler on Heroku

Now to get the scheduler up on Heroku.

```
heroku addons:create scheduler:standard
```

I logged into my app's Heroku dashboard. I set the frequency to every 10 minutes with the following command:

```
php artisan emails:send
```

And to test if your artisan command is working properly:

```
heroku run php artisan emails:send
```

I started seeing emails in my inbox, nice! Now for some fine tuning.