from django.db import models
from django.contrib.auth.models import User
from django.db.models.deletion import CASCADE
# Admin paneline üye olan kişileri kullanmak için bunu import ettik


class Post(models.Model):
    image = models.ImageField(upload_to='uploads/')
    # Charfield has max length, but textfield doesnt.
    content = models.TextField()
    # Cascade is for deleting all the posts when the user deleted.
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    # When the post uploaded, the time is adding at that time.
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.author} shared by {self.content}"

    @property
    def like_count(self):
        if(hasattr(self, '_likes_count')):
            return self._likes_count
        self._likes_count = self.like_set.count()
        return self._likes_count

    @property
    def comment_count(self):
        if(hasattr(self, '_comments_count')):
            return self._comments_count
        self._comments_count = self.comment_set.count()
        return self._comments_count


class Like(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.post.content} liked by {self.user.username}"


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.post.content} commented by {self.user.username}"
