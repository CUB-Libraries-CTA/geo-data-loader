''' This fabfile is for use with deploying javascript-only applications to the cybercommons '''

import os

from fabric.api import *


#env.sitename = os.path.basename(os.getcwd())
#env.host = 'test.oklahomawatersurvey.org'


def mgmic():
    """
    Work on staging environment
    """
    env.sitename ="portal"
    env.settings = 'testing'
    env.path = '/data/static/%(sitename)s' % env
    env.virtpy = '%(path)s/virtpy' % env
    env.log_path = '%(path)s/log' % env
    env.hosts = ['mgmic.oscer.ou.edu']


def setup_directories():
    run('mkdir -p %(path)s' % env)


def setup():
    setup_directories()
    copy_working_dir()


def deploy():
    copy_working_dir()
    bounce_nginx()


def copy_working_dir():
    local('tar --exclude fabfile.py --exclude fabfile.pyc --exclude .git -czf /tmp/deploy_%(sitename)s.tgz .' % env)
    put('/tmp/deploy_%(sitename)s.tgz' % env, '%(path)s/deploy_%(sitename)s.tgz' % env)
    run('cd %(path)s; tar -xf deploy_%(sitename)s.tgz; rm deploy_%(sitename)s.tgz' % env)
    sudo('chmod -R 775 %(path)s' % env)
    local('rm /tmp/deploy_%(sitename)s.tgz' % env)


def bounce_nginx():
    """ Restart the nginx web server """
    sudo('service nginx restart')
def bounce_apache():
    """ Restart the apache web server """
    sudo('/etc/init.d/httpd restart')

