from django.http import HttpResponseRedirect
from django.urls import reverse
from django.utils.deprecation import MiddlewareMixin


class DisableCsrfCheck(MiddlewareMixin):
    def process_request(self, req):
        attr = '_dont_enforce_csrf_checks'
        if not getattr(req, attr, False):
            setattr(req, attr, True)


class AuthRequiredMiddleware(MiddlewareMixin):
    def process_request(self, request):
        print request.user.is_authenticated
        print request.path
        print request.path.startswith('/login')
        if not request.user.is_authenticated and (
                request.path == '/' or request.path.startswith('/app') or request.path.startswith('/api')):
            return HttpResponseRedirect(reverse('login') + "?next=" + request.path)
