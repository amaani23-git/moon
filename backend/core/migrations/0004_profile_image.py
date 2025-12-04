from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_profile'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='profiles/'),
        ),
    ]
