from autobahn.twisted.wamp import ApplicationSession
from twisted.internet.defer import inlineCallbacks


def exp(x, y):
    return float(x)**float(y)

class MathApplication(ApplicationSession):
    """An application that does simple math."""
    @inlineCallbacks
    def onJoin(self, details):
        yield self.register(exp, 'com.crossbar_example.exp')


if __name__ == "__main__":
    from autobahn.twisted.wamp import ApplicationRunner

    runner = ApplicationRunner(
        url=u"ws://localhost:8080/ws",
        realm=u"crossbar-example"
    )
    runner.run(MathApplication)
