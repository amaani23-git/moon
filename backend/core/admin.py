from django.contrib import admin
from django.utils.html import format_html
from .models import Service, Project, ServiceRequest, ContactMessage


# Customize the admin site header
admin.site.site_header = "Moon Administration"
admin.site.site_title = "Moon Admin"
admin.site.index_title = "Site Administration"


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'active', 'icon_badge')
    list_editable = ('active',)
    search_fields = ('title', 'icon')
    list_filter = ('active',)
    ordering = ('-active', 'title')
    list_per_page = 25

    def icon_badge(self, obj):
        if obj.icon:
            return format_html('<span style="font-weight:600">{}</span>', obj.icon)
        return '-'
    icon_badge.short_description = 'Icon'


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'completed', 'created_at')
    list_editable = ('completed',)
    search_fields = ('title',)
    list_filter = ('completed',)
    date_hierarchy = 'created_at'
    ordering = ('-created_at',)
    list_per_page = 25

    actions = ('mark_completed', 'mark_not_completed')

    def mark_completed(self, request, queryset):
        updated = queryset.update(completed=True)
        self.message_user(request, f"{updated} project(s) marked as completed.")
    mark_completed.short_description = 'Mark selected projects as completed'

    def mark_not_completed(self, request, queryset):
        updated = queryset.update(completed=False)
        self.message_user(request, f"{updated} project(s) marked as not completed.")
    mark_not_completed.short_description = 'Mark selected projects as not completed'


@admin.register(ServiceRequest)
class ServiceRequestAdmin(admin.ModelAdmin):
    list_display = ('name', 'service', 'email', 'phone', 'created_at')
    list_filter = ('service', 'created_at')
    search_fields = ('name', 'email', 'phone')
    ordering = ('-created_at',)
    readonly_fields = ('created_at',)
    date_hierarchy = 'created_at'
    list_per_page = 25


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at')
    search_fields = ('name', 'email', 'subject')
    readonly_fields = ('created_at',)
    ordering = ('-created_at',)
    date_hierarchy = 'created_at'
    list_per_page = 25
